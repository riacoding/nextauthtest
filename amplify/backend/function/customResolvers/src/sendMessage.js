const { signedRequest } = require("./appSyncCalls");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const lookUpUser = /* GraphQL */ `
  query usersByEmail($email: AWSEmail!) {
    usersByEmail(email: $email) {
      items {
        id
        firstname
        lastname
        email
        sub
      }
    }
  }
`;

const createMessageRequest = /* GraphQL */ `
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      senderId
      senderEmail
      firstname
      lastname
      recipients
      recipientId
      createdAt
      type
      subject
      body
      isModeration
      moderationType
      moderation
      owner
    }
  }
`;

exports.sendMessage = async (event) => {
  const { senderId, senderEmail, recipients, subject, body, isModeration, moderationType, moderation } =
    event.arguments.input;
  const loggedInUser = event.identity.claims.sub;
  const response = [];
  if (recipients.length <= 0) {
    return { status: "failed", error: "No recipients" };
  }

  // iterate through recipients and create message
  for (recipient of recipients) {
    console.log("recipient", recipient);
    //if recipient startwith @, then it is a group or Alias
    try {
      if (recipient.startsWith("@")) {
        if (recipient === "@Admin") {
          //replace recipients @Admin with ADMIN_EMAIL
          recipients.splice(recipients.indexOf("@Admin"), 1, ADMIN_EMAIL);
          console.log("recipients", recipients);
          const senderRequest = {
            senderId: loggedInUser,
            senderEmail,
            recipients,
            subject,
            body,
            type: "sent",
            isModeration,
            moderationType,
            moderation,
          };
          const sentMessage = await createSenderMessage(senderRequest);
          const recipientRequest = {
            senderId: loggedInUser,
            senderEmail,
            senderFirstname: sentMessage.firstname,
            senderLastname: sentMessage.lastname,
            recipient: ADMIN_EMAIL,
            recipients,
            subject,
            body,
            type: "received",
            isModeration,
            moderationType,
            moderation,
            createdAt: sentMessage.createdAt,
          };

          const recipientsMessages = await createRecipientMessage(recipientRequest);

          console.log("response", { status: "success", recipient });
          response.push({ status: "success", recipient });
        } else {
          const senderRequest = {
            senderId: loggedInUser,
            senderEmail,
            recipients,
            subject,
            body,
            type: "sent",
            isModeration,
            moderationType,
            moderation,
          };
          const sentMessage = await createSenderMessage(senderRequest);
          const groupMessages = await createGroupMessage(
            loggedInUser,
            ADMIN_EMAIL,
            recipients,
            subject,
            body,
            sentMessage.createdAt,
            isModeration,
            moderationType,
            moderation
          );
          console.log("response", { status: "success", recipient });
          response.push({ status: "success", recipient });
        }
      } else {
        const senderRequest = {
          senderId: loggedInUser,
          senderEmail,
          recipients,
          subject,
          body,
          type: "sent",
          isModeration,
          moderationType,
          moderation,
        };
        const sentMessage = await createSenderMessage(senderRequest);

        const recipientRequest = {
          senderId: loggedInUser,
          senderEmail,
          senderFirstname: sentMessage.firstname,
          senderLastname: sentMessage.lastname,
          recipient,
          recipients,
          subject,
          body,
          type: "received",
          isModeration,
          moderationType,
          moderation,
          createdAt: sentMessage.createdAt,
        };

        const recipientsMessages = await createRecipientMessage(recipientRequest);
        console.log("response", { status: "success", recipient });
        response.push({ status: "success", recipient });
      }
      return response;
    } catch (err) {
      console.log(err);
      response.push({ status: "failed", recipient, message: "API send message failure" });
    } finally {
      return response;
    }
  }
};

async function sendToRecipients(options) {
  const {
    senderId,
    senderEmail,
    recipients,
    subject,
    body,
    type = "received",
    isModeration,
    moderationType,
    moderation,
  } = options;
  console.log(`send To Recipients sender:${senderEmail} recipients:${recipients} `);
  //look up sender first and last names
  const { data, errors } = await signedRequest(lookUpUser, { email: senderEmail });
  const sender = data.usersByEmail.items[0];
  try {
    const sentMessages = await Promise.all(
      otherRecipients.map(async (messageRecipient) => {
        const recipientMessage = await createRecipientMessage(
          sender.firstname,
          sender.lastname,
          senderId,
          senderEmail,
          messageRecipient,
          otherRecipients,
          subject,
          body,
          sendDate,
          isModeration,
          moderationType,
          moderation
        );
        return recipientMessage;
      })
    );

    return sentMessages;
  } catch (err) {
    console.log(err);
  }
}

async function createSenderMessage(options) {
  const {
    senderId,
    senderEmail,
    recipients,
    subject,
    body,
    type = "sent",
    isModeration,
    moderationType,
    moderation,
  } = options;
  console.log("options", options);
  //lookup sender first and last names
  const { data, errors } = await signedRequest(lookUpUser, { email: senderEmail });
  const sender = data.usersByEmail.items[0];

  let response;
  try {
    const sendDate = new Date().toISOString();
    if (senderId) {
      const messageRequest = {
        input: {
          createdAt: sendDate,
          senderEmail: senderEmail,
          firstname: sender.firstname,
          lastname: sender.lastname,
          senderId: senderId,
          recipientId: senderId,
          recipients: [...recipients],
          type: type,
          subject: subject,
          body: body,
          owner: `${senderId}::${senderId}`,
          isModeration: isModeration,
          moderationType: moderationType,
          moderation: JSON.stringify(moderation, null, 2),
        },
      };

      console.log("sender message request", messageRequest);

      //sender message
      const senderResponse = await signedRequest(createMessageRequest, messageRequest);
      console.log("senderResponse", JSON.stringify(senderResponse, null, 2));
      if (senderResponse.data) {
        response = senderResponse.data.createMessage;
      } else {
        throw new Error(`API send message Error recipient:${senderEmail}`);
      }
    } else {
      return { errors: [{ message: "API send message error no senderId" }], messages: [] };
    }

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function createRecipientMessage(options) {
  const {
    senderId,
    senderEmail,
    senderFirstname,
    senderLastname,
    recipient,
    recipients,
    subject,
    body,
    type = "received",
    isModeration,
    moderationType,
    moderation,
    createdAt,
  } = options;
  let response = {};
  try {
    const { data, errors } = await signedRequest(lookUpUser, { email: recipient });
    console.log("lookupUser", recipient, JSON.stringify(data, null, 2), errors);
    if (!errors) {
      const user = data.usersByEmail.items[0];
      if (user?.sub) {
        const messageRequest = {
          input: {
            createdAt,
            senderEmail,
            senderId,
            firstname: senderFirstname,
            lastname: senderLastname,
            recipientId: user.sub,
            recipients: [...recipients],
            type: "received",
            subject,
            body,
            owner: `${user.sub}::${user.sub}`,
            isModeration,
            moderationType,
            moderation: JSON.stringify(moderation, null, 2),
          },
        };

        const recipientResponse = await signedRequest(createMessageRequest, {
          ...messageRequest,
        });

        if (recipientResponse.data) {
          response = recipientResponse.data.createMessage;
        } else {
          throw new Error(`API send message Error recipient:${recipient}`);
        }
      } else {
        //user not recognized send notification to sender
        const errorSubject = "User not found";
        const errorBody = `User ${recipient} not found`;

        const senderRequest = {
          senderId,
          senderEmail,
          recipients,
          subject,
          body,
          type: "sent",
          isModeration,
          moderationType,
          moderation,
        };

        const errorMessage = await createSenderMessage(
          senderId,
          senderEmail,
          [recipient],
          errorSubject,
          errorBody,
          "received"
        );
        console.log(`User not found ${recipient} ${errorMessage}`);
        response = null;
      }
    }
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function createGroupMessage(
  senderId,
  senderEmail,
  group,
  subject,
  message,
  sendDate,
  isModeration,
  moderationType,
  moderation
) {
  const members = await getGroupMembers(group);
  let sentMessages;
  try {
    if (members.length > 0) {
      sentMessages = await Promise.all(
        members.map(async (member, index) => {
          const sentMessage = await createRecipientMessage(
            senderId,
            senderEmail,
            member.email,
            group,
            subject,
            message,
            sendDate,
            isModeration,
            moderationType,
            moderation
          );
          return sentMessage;
        })
      );
      return sentMessages;
    } else {
      return [];
    }
  } catch (err) {
    console.log("API group send message Error");
  }
}

async function getGroupMembers(group) {
  try {
    const members = Promise.all(
      group.map(async (recipient) => {
        const { data, errors } = await signedRequest(lookUpUser, { email: recipient });
        if (!errors) {
          return data.usersByEmail.items[0];
        }
      })
    );
    return members;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function replyMessage(message) {
  //create Thread
}

async function createThread(newMessage, orginalMessage) {
  //create ThreadId
  //assign ThreadId to original message
  //assignThreadId to new message
}
