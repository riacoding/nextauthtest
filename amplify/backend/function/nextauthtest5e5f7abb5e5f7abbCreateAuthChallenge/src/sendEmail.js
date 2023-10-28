const AWS = require("aws-sdk");

const REGION = process.env.ANALYTICS_NEXTAUTHTEST_REGION;
const APPLICATION_ID = process.env.ANALYTICS_NEXTAUTHTEST_ID;
const pinpoint = new AWS.Pinpoint({ region: REGION });

exports.sendPinpointEmail = async (recipientEmail, code) => {
  const senderEmail = "lbutton@riacoding.com";
  const messageRequest = {
    ApplicationId: APPLICATION_ID,
    MessageRequest: {
      Addresses: {
        [recipientEmail]: {
          ChannelType: "EMAIL",
        },
        [senderEmail]: {
          ChannelType: "EMAIL",
        },
      },
      MessageConfiguration: {
        EmailMessage: {
          FromAddress: senderEmail,
          SimpleEmail: {
            Subject: {
              Charset: "UTF-8",
              Data: "NAP Auth code",
            },
            TextPart: {
              Charset: "UTF-8",
              Data: `Here is your code ${code}`,
            },
          },
        },
      },
    },
  };

  console.log("message request", JSON.stringify(messageRequest, null, 2));

  try {
    const result = await pinpoint.sendMessages(messageRequest).promise();
    console.log("message send result", JSON.stringify(result, null, 2));
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
