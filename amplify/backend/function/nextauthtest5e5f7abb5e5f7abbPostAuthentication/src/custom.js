/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
exports.handler = async (event, context) => {
  console.log("Event:", event);
  //record login
  const sns = new AWS.SNS();
  try {
    //publish to topic - add user to Applicant Table
    console.log("SNS send createProfile topic", JSON.stringify(event.request.userAttributes, null, 2));
    const sns = new AWS.SNS();
    const topicParams = {
      Message: JSON.stringify(event.request.userAttributes, null, 2),
      Subject: "UserMigrate",
      TopicArn: "arn:aws:sns:us-west-1:897103703532:sns-topic-nextauthtest-User-dev-dev",
    };
    const snsResult = await sns.publish(topicParams).promise();
  } catch (err) {
    console.log("create profile error", err);
  }
  //look up user usersByEmail

  //isUser legacy and isMigrated false

  //send message subject:MigrateUser to User Topic for lambda migration
  return event;
};
