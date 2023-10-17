import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Amplify, API, Auth } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Flex, Card, Text, TextField, TextAreaField, View, Button } from "@aws-amplify/ui-react";
import styles from "../styles/form.module.css";

const sendMessageMutation = /* GraphQL */ `
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      messages {
        id
      }
      errors {
        message
      }
    }
  }
`;

export default function MessageForm({ user }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // Toast message to display
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      recipients: "",
      body: "",
    },
  });

  // Function to show the toast message
  const showToast = () => {
    setToastVisible(true);

    // Automatically hide the toast after 2 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  async function sendMessage(message) {
    console.log("send message", message);
    try {
      const result = await API.graphql({
        query: sendMessageMutation,
        variables: {
          input: { ...message },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }

  const onSubmit = async (data) => {
    const request = { ...data };
    request.senderId = user.attributes.sub;
    request.senderEmail = user.attributes.email;
    request.recipients = [];
    request.recipients.push(data.recipients);

    console.log(request);
    await sendMessage(request);
    setToastMessage("Message sent successfully");
    showToast();
  };

  return (
    <Flex width={"100%"} alignItems={"center"} direction={"column"}>
      <form className={styles.metadataForm} onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={"10px"} alignItems={"center"} direction={"column"}>
          <Card width={"100%"} variation="outlined" paddingBottom={"30px"}>
            <Text padding="20px 0px" fontWeight={"bold"}>
              Message
            </Text>
            <TextField id="recipients" type="text" label="Recipient" {...register("recipients", { required: true })} />
            {errors.recipient && <span className={styles.error}>This field is required</span>}
            <TextField
              className={styles.metadata}
              id="subject"
              type="text"
              label="Subject"
              {...register("subject", { required: true })}
            />
            {errors.subject && <span className={styles.error}>This field is required</span>}
            <TextAreaField id="body" type="text" label="message" {...register("body", { required: true })} />
            {errors.body && <span className={styles.error}>This field is required</span>}
          </Card>
        </Flex>
        <View className={styles.messageContainer}>
          {
            <Text
              fontSize={{ base: "small", large: "medium" }}
              width={{ base: "200px", large: "320px" }}
              height={"50px"}
              className={toastVisible ? styles.message : styles.hidden}
            >
              {` ${toastMessage}`}
            </Text>
          }
          <View>
            <Button className={styles.formButton} variation="primary" type="submit" value="save">
              Send Message
            </Button>
          </View>
        </View>
      </form>
    </Flex>
  );
}
