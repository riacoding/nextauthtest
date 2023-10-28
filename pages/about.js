import React from "react";
import { Amplify, Auth, withSSRContext, API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import config from "../src/aws-exports";

import styles from "../styles/Home.module.css";
Amplify.configure({ ...config, ssr: true });

const getUsers = /*GraphQL */ `
 query listUsers {
  listUsers{
    items{
      firstname
      lastname
      email
    }
  }
 }
`;

export async function getServerSideProps({ req }) {
  let authMode;
  const SSR = withSSRContext({ req });
  await SSR.Auth.currentAuthenticatedUser()
    .then((user) => {
      authMode = GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS;
    })
    .catch((err) => {
      authMode = GRAPHQL_AUTH_MODE.AWS_IAM;
    });

  try {
    const { data, errors } = await SSR.API.graphql({
      query: getUsers,
      authMode,
    });
    if (!errors) {
      return {
        props: {
          users: data["listUsers"].items.sort((a, b) => (a.lastname > b.lastname ? 1 : -1)),
          errors: [],
        },
      };
    } else {
      return {
        props: {
          users: [],
          errors: errors,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default function About({ users, errors }) {
  return (
    <main className={styles.main}>
      <h1>About</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </main>
  );
}
