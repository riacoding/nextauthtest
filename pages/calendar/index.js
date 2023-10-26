import react, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  withAuthenticator,
  Flex,
  Card,
  Text,
  TextField,
  TextAreaField,
  View,
  Button,
  Loader,
} from "@aws-amplify/ui-react";
import { Amplify, API, Auth, graphqlOperation } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import styles from "../../styles/Home.module.css";

const getListings = /* GraphQL */ `
  query getCurrentListings($date: String!) {
    listingsByApproval(
      approval: accepted
      eventDate: { le: $date }
      filter: { isPublished: { eq: true } }
      sortDirection: ASC
    ) {
      items {
        id
        title
        body
        city
        state
        publishDate
        eventDate
        teardownDate
        isPublished
      }
    }
  }
`;

function Calendar({ signOut, user }) {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const getCalendarListings = async () => {
      try {
        const { data, errors } = await API.graphql({
          query: getListings,
          variables: {
            date: "2024-01-01",
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
        if (!errors) {
          setListings(data["listingsByApproval"].items);
        } else {
          throw new Error("Calendar Listings Error");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCalendarListings();
  }, [user]);

  function Listing({ data }) {
    return (
      <Flex>
        <Card margin={"20px"} padding={"20px"} width={"500px"} backgroundColor={"whitesmoke"} variation="outlined">
          <Flex direction={"row"}>
            <Text fontWeight={"900"} as={"span"}>
              {data.title},{" "}
            </Text>
            <Text as={"span"}>{new Date(data.eventDate).toLocaleDateString()}</Text>
          </Flex>
          <Text>{data.body}</Text>
          <Flex direction={"row"}>
            <Text as={"span"}>{data.city}, </Text>
            <Text as={"span"}>{data.state}</Text>
          </Flex>
        </Card>
      </Flex>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Calendar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Calendar</h1>
        <Link href="/calendar/createlisting">Create Listing</Link>
        {listings.map((listing, index) => (
          <Listing key={index} data={listing} />
        ))}
      </main>
    </div>
  );
}

export default withAuthenticator(Calendar, { loginMechanisms: ["email"] });
