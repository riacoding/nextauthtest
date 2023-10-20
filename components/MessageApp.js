import React, { useState, useEffect } from "react";
import { Flex, Card, Text, TextField, TextAreaField, View, Button } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import styles from "../styles/Message.module.css";
import { FaChevronLeft } from "react-icons/fa";
import MessageDetail from "./MessageDetail";

const folders = ["inbox", "sent", "drafts", "trash"];

function Folders({ folderNames }) {
  return (
    <Flex direction="column" gap="1rem">
      {folderNames.map((folder) => (
        <Button name={folder} onClick={(e) => console.log(e.target.name)} key={folder}>
          {folder}
        </Button>
      ))}
    </Flex>
  );
}

function Message({ message, setDetail }) {
  return (
    <Flex
      onClick={() => setDetail({ show: true, id: message.id })}
      className={styles.messageRow}
      padding={"5px"}
      alignItems={"center"}
      height="45px"
      width={"100%"}
      border={"1px solid lightgrey"}
    >
      <Text
        className={!message.isRead ? styles.bold : ""}
        width={"100px"}
      >{`${message?.firstname} ${message?.lastname}`}</Text>
      <Text className={!message.isRead ? styles.bold : ""} width={"200px"}>
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
  useEffect(() => {
    if (detail.id) {
      const message = messages.find((message) => message.id === detail.id);
      setSelectedMessage(message);
    }
  }, [detail, messages]);

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

        {!detail.show && !isComposing && <MessageList setDetail={setDetail} messages={messages} />}

        {!detail.show && isComposing && <MessageDetail isComposing={isComposing} message={selectedMessage} />}
      </Flex>
    </Flex>
  );
}
