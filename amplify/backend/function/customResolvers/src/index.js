/* Amplify Params - DO NOT EDIT
	API_NEXTAUTHTEST_GRAPHQLAPIENDPOINTOUTPUT
	API_NEXTAUTHTEST_GRAPHQLAPIIDOUTPUT
	API_NEXTAUTHTEST_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { sendMessage } = require("./sendMessage");

const resolvers = {
  Mutation: {
    setCurrentCompetition: (event) => {
      return makeCompetitionCurrent(event);
    },
    sendMessage: (event) => {
      return sendMessage(event);
    },
  },
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      const resolverResult = await resolver(event);
      console.log("resolver result", resolverResult);
      return resolverResult;
    }
  }
  throw new Error("Resolver not found.");
};
