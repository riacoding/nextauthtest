import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Flex, Card, Text, TextField, TextAreaField, View, Button } from "@aws-amplify/ui-react";
import styles from "../styles/form.module.css";

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
      recipient: "",
      message: "",
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

  const onSubmit = (data) => {
    data.sender = user.attributes.sub;
    console.log(data);
    showToast();
  };

  return (
    <Flex width={"100%"} alignItems={"center"} paddingBlockEnd={"50px"} direction={"column"}>
      <form className={styles.metadataForm} onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={"10px"} alignItems={"center"} direction={"column"}>
          <Card width={"100%"} variation="outlined" paddingBottom={"30px"}>
            <Text padding="20px 0px" fontWeight={"bold"}>
              Message
            </Text>
            <TextField
              className={styles.metadata}
              id="subject"
              type="text"
              label="Subject"
              {...register("subject", { required: true })}
            />
            {errors.subject && <span className={styles.error}>This field is required</span>}
            <TextField id="recipient" type="text" label="Recipient" {...register("recipient", { required: true })} />
            {errors.recipient && <span className={styles.error}>This field is required</span>}
            <TextAreaField id="message" type="text" label="message" {...register("message", { required: true })} />
            {errors.message && <span className={styles.error}>This field is required</span>}
          </Card>
        </Flex>

        <View paddingTop={"20px"} className={styles.buttonGroup}>
          <View className={styles.messageContainer}>
            {
              <Text
                fontSize={{ base: "small", large: "medium" }}
                width={{ base: "200px", large: "320px" }}
                className={toastVisible ? styles.message : styles.hidden}
              >
                {` ${toastMessage}`}
              </Text>
            }
          </View>
          <Button className={styles.formButton} variation="primary" type="submit" value="save">
            Send Message
          </Button>
        </View>
      </form>
    </Flex>
  );
}
