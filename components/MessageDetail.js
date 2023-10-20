import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Flex, Card, Text, TextField, TextAreaField, View, Button } from "@aws-amplify/ui-react";
import MessageForm from "./MessageForm";
import styles from "../styles/Message.module.css";

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
      </View>
    </Card>
  );
}

export default function MessageDetail({ message, isComposing }) {
  const [isReplying, setIsReplying] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  return (
    <Flex
      direction={"column"}
      padding={"20px"}
      backgroundColor={"whitesmoke"}
      height={"600px"}
      alignItems={"center"}
      width={"100%"}
    >
      {isComposing && (
        <MessageForm
          message={{}}
          isComposing={isComposing}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
          user={currentUser}
        />
      )}

      {isReplying && !isComposing && (
        <MessageForm
          message={message}
          isComposing={isComposing}
          isReplying={isReplying}
          setIsReplying={setIsReplying}
          user={currentUser}
        />
      )}

      {!isReplying && !isComposing && <DetailCard message={message}></DetailCard>}

      {!isReplying && !isComposing && (
        <Flex width={"80%"} justifyContent={"flex-end"}>
          <Button onClick={() => setIsReplying(true)} variation="primary">
            Reply
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
