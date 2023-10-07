import { signedRequest } from "./appSyncCalls";

const lookUpUser = /* GraphQL */ `
  query usersByEmail($email: String!) {
    usersByEmail(email: $email) {
      id
      email
      sub
    }
  }
`;

const createMessageRequest = /* GraphQL */ `
mutation createMessage(input: createMessageInput!) {
    createMessage(input: $input) {
        id
        sender
        recipient
        subject
        message
    }
}
`;

exports.sendMessage = async (event) => {
  const { sender, recipients, subject, message } = event.arguments.input;

  //iterate through recipients and create message
  for (let i = 0; i < recipients.length; i++) {
    const recipient = recipients[i];
    //if recipient startwith @, then it is a group
    if (recipient.startsWith("@")) {
      await createGroupMessage(sender, recipient, subject, message);
    }
    await createMessage(sender, recipient, subject, message);
  }
};

async function createMessage(sender, recipient, otherRecipients, subject, message) {
  //lookup recipient
  let response;
  try {
    const user = await signedRequest(lookUpUser, { email: recipient });
    console.log("user", user);
    const sendDate = new Date().toISOString;
    if (user.sub) {
      const message = {
        createdAt: sendDate,
        sender: sender,
        recipient: user.sub,
        recipients: [...otherRecipients],
        isSentMessage: true,
        subject: subject,
        body: message,
      };

      //sender message
      const senderResponse = await signedRequest(createMessageRequest, message);
      //recipient message
      const recipientResponse = await signedRequest(createMessageRequest, { ...message, isSentMessage: false });
      response = senderResponse.id;
    }
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function createGroupMessage(sender, group, subject, message) {
  const members = await getGroupMembers(group);
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    await createMessage(sender, member, subject, message);
  }
}

async function getGroupMembers(group) {}
