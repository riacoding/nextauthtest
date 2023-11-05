const axios = require("axios");
const crypto = require("@aws-crypto/sha256-js");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const { SignatureV4 } = require("@aws-sdk/signature-v4");
const { HttpRequest } = require("@aws-sdk/protocol-http");
const { Sha256 } = crypto;

const GRAPHQL_ENDPOINT = process.env.API_NEXTAUTHTEST_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_NEXTAUTHTEST_GRAPHQLAPIKEYOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-west-1";

exports.signedRequest = async (query, variables) => {
  console.log("request variables", variables);
  const endpoint = new URL(GRAPHQL_ENDPOINT);
  const prov = await defaultProvider();

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: "appsync",
    sha256: Sha256,
  });

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    host: endpoint.host,
    body: JSON.stringify({
      query,
      variables,
    }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);

  const options = {
    method: "POST",
    url: GRAPHQL_ENDPOINT,
    headers: signed.headers,
    data: { query, variables },
  };

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await axios(options);
    body = response.data;
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return body;
};

exports.APIKeyRequest = async (query, variables) => {
  let options = {};
  options = {
    method: "post",
    url: GRAPHQL_ENDPOINT,
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
    },
    data: JSON.stringify({ query, variables }),
  };

  console.log("request options: ", options);

  let body;
  let statusCode = 200;
  let response;

  try {
    response = await axios(options);
    body = response.data;
    if (response.status === 400) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }

  return {
    statusCode,
    response: body.data,
  };
};
