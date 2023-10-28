/* Amplify Params - DO NOT EDIT
	ANALYTICS_NEXTAUTHTEST_ID
	ANALYTICS_NEXTAUTHTEST_REGION
	ENV
	REGION
Amplify Params - DO NOT EDIT */ const _ = require("lodash");
const { sendPinpointEmail } = require("./sendEmail");
const Chance = require("chance");
const chance = new Chance();
const MAX_ATTEMPTS = 3;
/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */
exports.handler = async (event, context) => {
  console.log("event:", event);
  let otpCode;
  if (!event.request.session || !event.request.session.length) {
    // new auth session
    otpCode = chance.string({ length: 6, alpha: false, symbols: false });
    await sendPinpointEmail(event.request.userAttributes.email, otpCode);
  } else {
    // existing session, user has provided a wrong answer, so we need to
    // give them another chance
    const previousChallenge = _.last(event.request.session);
    const challengeMetadata = previousChallenge?.challengeMetadata;

    if (challengeMetadata) {
      // challengeMetadata should start with "CODE-", hence index of 5
      otpCode = challengeMetadata.substring(5);
    }
  }

  const attempts = _.size(event.request.session);
  const attemptsLeft = MAX_ATTEMPTS - attempts;
  event.response.publicChallengeParameters = {
    email: event.request.userAttributes.email,
    maxAttempts: MAX_ATTEMPTS,
    attempts,
    attemptsLeft,
  };

  // NOTE: the private challenge parameters are passed along to the
  // verify step and is not exposed to the caller
  // need to pass the secret code along so we can verify the user's answer
  event.response.privateChallengeParameters = {
    secretLoginCode: otpCode,
  };

  event.response.challengeMetadata = `CODE-${otpCode}`;

  return event;
};
