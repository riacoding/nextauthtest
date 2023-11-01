import React, { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Flex, Card, Text, TextField, TextAreaField, View, Button, useTheme, Loader } from "@aws-amplify/ui-react";
import { sendMessage } from "../lib/sendMessage";
import MessageForm from "./MessageForm";
import CalendarListing from "./CalendarListing";
import styles from "../styles/Message.module.css";

const moderationAcceptReject = /* GraphQL */ `
  mutation moderationAcceptReject($input: UpdateCalendarListingInput!) {
    updateCalendarListing(input: $input) {
      id
      approval
    }
  }
`;

function Header({ message }) {
  return (
    <Flex direction={"column"} width={"100%"}>
      <Flex width={"100%"}>
        <Text>From:</Text>
        <Text>{`${message.firstname} ${message.lastname}`}</Text>
        <Text>{new Date(message.createdAt).toLocaleString()}</Text>
      </Flex>
      <Flex>
        <Text>To:</Text>
        <Text>{`${message.recipients}`}</Text>
      </Flex>
      <Flex>
        <Text>Subject:</Text>
        <Text>{`${message.subject}`}</Text>
      </Flex>
    </Flex>
  );
}

function DetailCard({ message }) {
  if (!message) return;
  const messages = message.body.split("###");
  return (
    <Card height={"90%"} variation="elevated" backgroundColor={"lightblue"} width={"80%"}>
      <Header message={message} />
      <View marginTop={"20px"} backgroundColor={"white"} height={"70%"} overflow={"scroll"} padding={"20px"}>
        {messages.map((message, index) => (
          <Text margin={"20px 0"} key={index}>
            {message}
          </Text>
        ))}
        <View>
          {message.isModeration && message.moderationType === "calendar" && (
            <CalendarListing data={JSON.parse(message.moderation)} />
          )}
        </View>
      </View>
    </Card>
  );
}

export default function MessageDetail({ message, isComposing, setIsComposing, user }) {
  const { tokens } = useTheme();
  const [isReplying, setIsReplying] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user);
      setGroups(user.signInUserSession.accessToken.payload["cognito:groups"]);
    };
    getUser();
  }, []);

  async function updateObjectApproval(message, approvalStatus) {
    const { id } = message;
    const updateRequest = {
      id,
      approval: approvalStatus,
      isPublished: true,
    };

    try {
      const { data, errors } = await API.graphql({
        query: moderationAcceptReject,
        variables: {
          input: updateRequest,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });

      if (!errors) {
        return data[updateCalendarListing];
      }
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  async function onAccept(message) {
    setIsAccepting(true);
    const calendarListing = JSON.parse(message.moderation);
    await updateObjectApproval(calendarListing, "accepted");
    console.log("accept", message);
    //const { id } = await updateObjectApproval(message, "accepted");
    const messageRequest = {
      senderEmail: currentUser.attributes.email,
      recipients: [message.senderEmail],
      subject: `Your ${message.moderationType} request is approved ✅`,
      body: `Your ${message.moderationType} request with id: ${calendarListing.id} and titled ${calendarListing.title} has been approved`,
    };
    await sendMessage(messageRequest);
    setIsAccepting(false);
  }

  async function onReject(message) {
    setIsRejecting(true);
    const calendarListing = JSON.parse(message.moderation);
    await updateObjectApproval(calendarListing, "rejected");
    console.log("reject", message);
    const messageRequest = {
      senderEmail: currentUser.attributes.email,
      recipients: [message.senderEmail],
      subject: `Your ${message.moderationType} request has been rejected`,
      body: `Your ${message.moderationType} request with id: ${calendarListing.id} and titled ${calendarListing.title} has been rejected`,
    };
    await sendMessage(messageRequest);
    setIsRejecting(false);
  }

  return (
    <Flex
      id="messages"
      direction={"column"}
      padding={"20px"}
      backgroundColor={"whitesmoke"}
      height={"600px"}
      alignItems={"center"}
      minWidth={"800px"}
      width={"100%"}
    >
      {isComposing && (
        <MessageForm
          message={{}}
          setIsComposing={setIsComposing}
          isComposing={isComposing}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
          user={currentUser}
        />
      )}

      {isReplying && !isComposing && (
        <MessageForm
          message={message}
          setIsComposing={setIsComposing}
          isComposing={isComposing}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
          user={currentUser}
        />
      )}

      {!isReplying && !isComposing && <DetailCard message={message}></DetailCard>}

      {!isReplying && !isComposing && (
        <Flex width={"80%"} justifyContent={"flex-end"}>
          {groups && groups.includes("admin") && message?.isModeration && (
            <Flex>
              <Button onClick={() => onReject(message)} backgroundColor={tokens.colors.reject} variation="primary">
                {isRejecting ? <Loader /> : "Reject"}
              </Button>
              <Button onClick={() => onAccept(message)} backgroundColor={tokens.colors.accept} variation="primary">
                {isAccepting ? <Loader /> : "Accept"}
              </Button>
            </Flex>
          )}
          <Button onClick={() => setIsReplying(true)} variation="primary">
            Reply
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
