import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { RequireAuth } from "../components/RequireAuth";
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Flex, Card, Text, TextField, TextAreaField, View, Button, useTheme, Loader } from "@aws-amplify/ui-react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import styles from "../styles/Home.module.css";
import CalendarListing from "../components/CalendarListing";

const images = [
  { imageURL: "/image-1.jpeg", entryId: "123" },
  { imageURL: "/image-2.jpeg", entryId: "456" },
  { imageURL: "/image-3.jpeg", entryId: "789" },
];

const checkVoteQuery = /* GraphQL */ `
  query getUserVote($id: ID!) {
    getVote(id: $id) {
      id
      entryId
    }
  }
`;

const votesCast = /* GraphQL */ `
  query votesByCompetition($competitionId: ID!) {
    votesByCompetition(competitionId: $competitionId) {
      items {
        id
        competitionId
        entryId
        votes
      }
    }
  }
`;

const castVoteMutation = /* GraphQL */ `
  mutation createVote($input: CreateVoteInput!) {
    createVote(input: $input) {
      id
      userId
      entryId
      competitionId
    }
  }
`;

async function checkVote(vote) {
  try {
    const { data, errors } = await API.graphql({
      query: checkVoteQuery,
      variables: {
        id: `${vote.competitionId}#${vote.userId}`,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });

    return data["getVote"];
  } catch (error) {
    console.log(error);
  }
}

async function getVoteAggregates(competitionId) {
  try {
    const { data, errors } = await API.graphql({
      query: votesCast,
      variables: {
        competitionId: competitionId,
      },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });

    return data["createVote"];
  } catch (error) {
    console.log(error);
  }
}

async function castVote(vote) {
  console.log("castVote", vote);
  const voteId = `${vote.competitionId}#${vote.userId}`;
  console.log(voteId);
  try {
    const { data, errors } = await API.graphql({
      query: castVoteMutation,
      variables: {
        input: {
          id: voteId,
          ...vote,
        },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });

    return data["createVote"];
  } catch (error) {
    console.log(error);
  }
}

export default function Voting() {
  const competitionId = "123";
  const [voteStatus, setVoteStatus] = useState({ hasVoted: false, vote: null });
  const [voteAggregates, setVoteAggregates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authStatus, cognitoUser, signOut } = useAuthRedirect();

  useEffect(() => {
    async function getAggregates() {
      setIsLoading(true);
      try {
        const { data, errors } = await API.graphql({
          query: votesCast,
          variables: {
            competitionId: competitionId,
          },
          authMode: cognitoUser ? GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS : GRAPHQL_AUTH_MODE.AWS_IAM,
        });
        setVoteAggregates(data["votesByCompetition"].items);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }
    //Not yet implemented for public
    if (cognitoUser) {
      getAggregates();
    }
  }, [cognitoUser]);

  useEffect(() => {
    if (cognitoUser) {
      const checkVoting = async () => {
        const voteRequest = {
          competitionId,
          userId: cognitoUser.attributes.sub,
        };
        const userVote = await checkVote(voteRequest);
        if (userVote) {
          setVoteStatus({ hasVoted: true, vote: userVote });
        } else {
          setVoteStatus({ hasVoted: false, vote: null });
        }
      };
      checkVoting();
    }
  }, [cognitoUser]);

  async function onVote(vote) {
    const { imageURL, ...voteRequest } = vote;
    voteRequest.userId = cognitoUser.attributes.sub;
    voteRequest.competitionId = competitionId;
    const userVote = await checkVote(voteRequest);
    console.log("userVote", userVote);
    if (userVote) {
      console.log("already Voted");
    } else {
      const castVoteResponse = await castVote(voteRequest);
      setVoteStatus({ hasVoted: true, vote: castVoteResponse });
      console.log("castVote", castVoteResponse);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Voting</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <View>
          <h1 className={styles.title}>Voting</h1>
          <RequireAuth>
            {isLoading ? <Loader variation="linear" /> : <VoteDisplay voteStatus={voteStatus} />}
          </RequireAuth>
        </View>
      </main>
    </div>
  );

  function VoteDisplay({ voteStatus }) {
    voteStatus.hasVoted ? console.log("Voted") : console.log("Not voted");
    return (
      <Flex>
        {images.map((image) => {
          return (
            <Card key={image.entryId}>
              <Flex justifyContent={"center"} direction={"column"}>
                <View className={styles.imageContainer} width={250} height={250}>
                  <Image src={image.imageURL} layout="fill" objectFit="contain" alt="Vote image" />
                </View>
                <View>
                  {voteAggregates && voteAggregates.find((vote) => vote.entryId === image.entryId) ? (
                    <Text textAlign="center">
                      Votes {voteAggregates.find((vote) => vote.entryId === image.entryId).votes}
                    </Text>
                  ) : (
                    <Text textAlign="center">No Votes</Text>
                  )}
                </View>
                <Button disabled={voteStatus.hasVoted} variation={"primary"} onClick={() => onVote(image)}>
                  {voteStatus.hasVoted ? "Voted" : "Vote"}
                </Button>
                {voteStatus.vote && voteStatus.vote.entryId === image.entryId ? (
                  <Text textAlign="center">✅</Text>
                ) : null}
              </Flex>
            </Card>
          );
        })}
      </Flex>
    );
  }
}
