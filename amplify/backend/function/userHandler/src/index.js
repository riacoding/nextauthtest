/* Amplify Params - DO NOT EDIT
	API_NEXTAUTHTEST_GRAPHQLAPIENDPOINTOUTPUT
	API_NEXTAUTHTEST_GRAPHQLAPIIDOUTPUT
	API_NEXTAUTHTEST_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { lookupUser } = require("./userFunctions");
const { migrateUser } = require("./userFunctions");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async function (event) {
  console.log("Event: ", JSON.stringify(event, null, 2));

  // Processing messages
  for (const record of event.Records) {
    const rec = JSON.parse(record.body);
    console.log("Message: ", JSON.parse(rec.Message));
    //lookup user by email
    const user = await lookupUser(JSON.parse(rec.Message).email);
    if (user?.legacy && !user?.migrated) {
      console.log("unmigrated legacy user found", user);
      await migrateUser(user);
    }
    //if no user create NAP user

    //if user is Legacy migrate all objects and add owner
  }
};
