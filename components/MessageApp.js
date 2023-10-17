import React, { useState } from "react";
import { Flex, Card, Text, TextField, TextAreaField, View, Button } from "@aws-amplify/ui-react";
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

function Message({ message, setShowDetail }) {
  return (
    <Flex
      onClick={() => setShowDetail(true)}
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
      >{`${message.firstname} ${message.lastname}`}</Text>
      <Text className={!message.isRead ? styles.bold : ""} width={"200px"}>
        {message.subject}
      </Text>
      <Text className={styles.bodyList} width={"500px"}>
        {message.body}
      </Text>
      <Text>{new Date(message.createdAt).toLocaleDateString()}</Text>
    </Flex>
  );
}

function MessageList({ messages, setShowDetail }) {
  console.log("messages", messages);
  if (!messages) return;
  return (
    <View>
      <Flex gap={"0px"} direction={"column"} width={"100%"} border={"1px solid black"}>
        {messages.length > 0 &&
          messages.map((message) => <Message setShowDetail={setShowDetail} key={message.id} message={message} />)}
      </Flex>
    </View>
  );
}

export default function MessageApp({ messages }) {
  const [showDetail, setShowDetail] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  return (
    <Flex direction={"column"} width={"100%"}>
      <Flex onClick={() => setShowDetail(false)} className={styles.back} paddingLeft={"100px"} alignItems={"center"}>
        <FaChevronLeft />
        <Text>Back</Text>
      </Flex>
      <Flex width={"100%"} justifyContent={"flex-start"}>
        <Folders folderNames={folders} />
        {showDetail ? (
          <MessageDetail message={selectedMessage} />
        ) : (
          <MessageList setShowDetail={setShowDetail} messages={messages} />
        )}
      </Flex>
    </Flex>
  );
}
