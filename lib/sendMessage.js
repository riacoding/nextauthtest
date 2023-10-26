import { Amplify, API, Auth } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

const sendMessageMutation = /* GraphQL */ `
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      status
      recipient
      error
    }
  }
`;

export async function sendMessage(message) {
  console.log("send message", message);
  try {
    const { data, errors } = await API.graphql({
      query: sendMessageMutation,
      variables: {
        input: { ...message },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    if (!errors) {
      return data.sendMessage;
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}
