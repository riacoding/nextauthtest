import React, { useState, useEffect } from "react";
import { Flex, Card, Text, TextField, TextAreaField, View, Button } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import styles from "../styles/Message.module.css";
import { FaChevronLeft } from "react-icons/fa";
import MessageDetail from "./MessageDetail";

const folders = ["inbox", "sent", "drafts", "trash"];

const getSentMessages = /* GraphQL */ `
  query getSenderMessages($senderId: ID!) {
    messagesBySender(senderId: $senderId, filter: { type: { eq: sent } }, sortDirection: DESC) {
      items {
        id
        senderEmail
        firstname
        lastname
        createdAt
        type
        recipients
        subject
        body
        isRead
      }
    }
  }
`;

const updateReadStatus = /* GraphQL */ `
  mutation updateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
      id
      isRead
    }
  }
`;

function Message({ message, setDetail }) {
  return (
    <Flex
      onClick={() => setDetail({ show: true, id: message.id, isRead: true })}
      className={styles.messageRow}
      padding={"5px"}
      alignItems={"center"}
      height="45px"
      width={"100%"}
      border={"1px solid lightgrey"}
    >
      <Text
        className={!message.isRead && message.type === "received" ? styles.bold : ""}
        width={"200px"}
      >{`${message?.firstname} ${message?.lastname}`}</Text>
      <Text className={!message.isRead && message.type === "received" ? styles.bold : ""} width={"200px"}>
        {message?.subject.slice(0, 20)}
      </Text>
      <Text className={styles.bodyList} width={"500px"}>
        {message?.body.slice(0, 80)}
      </Text>
      <Text>{new Date(message.createdAt).toLocaleDateString()}</Text>
    </Flex>
  );
}

function MessageList({ messages, setDetail }) {
  if (messages.length <= 0) {
    messages.push({
      id: -1,
      senderEmail: "@Admin",
      firstname: "NAP",
      lastname: "Admin",
      senderId: "100",
      recipients: "user@nap.com",
      recipientId: "101",
      type: "sent",
      subject: "New account",
      body: "You have not received any messages yet",
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <View width="100%" id="MessageList">
      <Flex gap={"0px"} direction={"column"} width={"100%"} border={"1px solid black"}>
        {messages.length > 0 &&
          messages.map((message) => <Message setDetail={setDetail} key={message.id} message={message} />)}
      </Flex>
    </View>
  );
}

export default function MessageApp({ messages }) {
  const [detail, setDetail] = useState({ show: false, id: null });
  const [isComposing, setIsComposing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [folder, setFolder] = useState("inbox");
  const [displayMessages, setDisplayMessages] = useState([]);

  useEffect(() => {
    setDisplayMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (detail.id) {
      const message = displayMessages.find((message) => message.id === detail.id);
      message.isRead = true;
      setSelectedMessage(message);
    }

    if (detail.isRead) {
      try {
        const result = API.graphql({
          query: updateReadStatus,
          variables: {
            input: { id: detail.id, isRead: true },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  }, [detail, displayMessages]);

  useEffect(() => {
    const getMessages = async () => {
      const user = await Auth.currentAuthenticatedUser();
      try {
        if (folder === "inbox") {
          setDisplayMessages(messages);
        }
        if (folder === "sent") {
          const { data, errors } = await API.graphql({
            query: getSentMessages,
            variables: {
              senderId: user.attributes.sub,
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          });
          if (!errors) {
            setDisplayMessages(data["messagesBySender"].items);
          } else {
            throw new Error("Set Messages Error");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [folder, messages]);

  function onFolderClick(e) {
    setDetail({ show: false, id: null });
    setFolder(e.target.name);
  }

  function Folders({ folderNames }) {
    return (
      <Flex direction="column" gap="1rem">
        {folderNames.map((folder) => (
          <Button name={folder} onClick={(e) => onFolderClick(e)} key={folder}>
            {folder}
          </Button>
        ))}
      </Flex>
    );
  }

  return (
    <Flex direction={"column"} width={"100%"}>
      <Flex className={styles.back} paddingLeft={"100px"} alignItems={"center"}>
        {detail.show ? (
          <Flex alignItems={"center"} onClick={() => setDetail({ show: false, id: null })}>
            <FaChevronLeft />
            <Text>Back to List</Text>
          </Flex>
        ) : (
          <Text fontWeight={"bold"} onClick={() => setIsComposing(!isComposing)}>
            Compose
          </Text>
        )}
      </Flex>
      <Flex width={"100%"} justifyContent={"flex-start"}>
        <Folders folderNames={folders} />
        {detail.show && !isComposing && <MessageDetail isComposing={isComposing} message={selectedMessage} />}

        {!detail.show && !isComposing && <MessageList setDetail={setDetail} messages={displayMessages} />}

        {!detail.show && isComposing && <MessageDetail isComposing={isComposing} message={selectedMessage} />}
      </Flex>
    </Flex>
  );
}
