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
      recipients
      recipientId
      createdAt
      type
      subject
      body
      owner
    }
  }
`;

exports.sendMessage = async (event) => {
  const { senderId, senderEmail, recipients, subject, body } = event.arguments.input;
  const loggedInUser = event.identity.claims.sub;

  if (recipients.length <= 0) {
    return { errors: [{ message: "No recipients" }], messages: [] };
  }

  //TODO: iterate through recipients and create message
  for (recipient of recipients) {
    console.log("recipient", recipient);
    //if recipient startwith @, then it is a group or Alias
    try {
      if (recipient.startsWith("@")) {
        if (recipient === "@Admin") {
          //replace recipients @Admin with ADMIN_EMAIL
          recipients.splice(recipients.indexOf("@Admin"), 1, ADMIN_EMAIL);
          console.log("recipients", recipients);
          const sentMessage = await createSenderMessage(loggedInUser, ADMIN_EMAIL, recipients, subject, body);
          const recipientsMessages = await sendToRecipients(
            loggedInUser,
            senderEmail,
            recipients,
            subject,
            body,
            sentMessage.createdAt
          );

          console.log(recipientsMessages);
          const response = { errors: [], messages: [...recipientsMessages] };
          console.log("response", response);
          return response;
        } else {
          const sentMessage = await createSenderMessage(loggedInUser, ADMIN_EMAIL, recipients, subject, body);
          const groupMessages = await createGroupMessage(
            loggedInUser,
            ADMIN_EMAIL,
            recipients,
            subject,
            body,
            sentMessage.createdAt
          );
          return { errors: [], messages: [...recipientsMessages] };
        }
      } else {
        const sentMessage = await createSenderMessage(loggedInUser, senderEmail, recipients, subject, body);
        const recipientsMessages = await sendToRecipients(
          loggedInUser,
          senderEmail,
          recipients,
          subject,
          body,
          sentMessage.createdAt
        );
        return { errors: [], messages: [...recipientsMessages] };
      }
    } catch (err) {
      console.log(err);
      return { errors: [{ message: "API send message error" }], messages: [] };
    }
  }
};

async function sendToRecipients(senderId, senderEmail, otherRecipients, subject, body, sendDate) {
  console.log(`send To Recipients sender:${senderEmail} recipients:${otherRecipients} `);
  try {
    const sentMessages = await Promise.all(
      otherRecipients.map(async (messageRecipient) => {
        //look up sender first and last names
        const { data, errors } = await signedRequest(lookUpUser, { email: senderEmail });
        const sender = data.usersByEmail.items[0];
        const recipientMessage = await createRecipientMessage(
          sender.firstname,
          sender.lastname,
          senderId,
          senderEmail,
          messageRecipient,
          otherRecipients,
          subject,
          body,
          sendDate
        );
        return recipientMessage;
      })
    );

    return sentMessages;
  } catch (err) {
    console.log(err);
  }
}

async function createSenderMessage(senderId, senderEmail, otherRecipients, subject, message, type = "sent") {
  //lookup recipient
  let response;
  try {
    const sendDate = new Date().toISOString();
    if (senderId) {
      const messageRequest = {
        input: {
          createdAt: sendDate,
          senderEmail: senderEmail,
          senderId: senderId,
          recipientId: senderId,
          recipients: [...otherRecipients],
          type: type,
          subject: subject,
          body: message,
          owner: `${senderId}::${senderId}`,
        },
      };

      //sender message
      const senderResponse = await signedRequest(createMessageRequest, messageRequest);
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

async function createRecipientMessage(
  senderFirstname,
  senderLastname,
  senderId,
  senderEmail,
  recipient,
  otherRecipients,
  subject,
  message,
  sendDate
) {
  console.log("createRecipientMessage", senderId, senderEmail, recipient, otherRecipients, subject, message, sendDate);
  let response = {};
  try {
    const { data, errors } = await signedRequest(lookUpUser, { email: recipient });
    console.log("lookupUser", recipient, JSON.stringify(data, null, 2), errors);
    if (!errors) {
      const user = data.usersByEmail.items[0];
      if (user?.sub) {
        const messageRequest = {
          input: {
            createdAt: sendDate,
            senderEmail: senderEmail,
            senderId: senderId,
            firstname: senderFirstname,
            lastname: senderLastname,
            recipientId: user.sub,
            recipients: [...otherRecipients],
            type: "received",
            subject: subject,
            body: message,
            owner: `${user.sub}::${user.sub}`,
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

async function createGroupMessage(senderId, senderEmail, group, subject, message, sendDate) {
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
            sendDate
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
