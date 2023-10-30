import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Amplify, API, Auth, Storage } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  Flex,
  Card,
  Text,
  TextField,
  TextAreaField,
  View,
  Button,
  Loader,
  withAuthenticator,
  FileUploader,
} from "@aws-amplify/ui-react";
import { RequireAuth } from "../../components/RequireAuth";
import styles from "../../styles/form.module.css";

const sendMessageMutation = /* GraphQL */ `
  mutation sendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      status
      recipient
      error
    }
  }
`;

const getUser = /* GraphQL */ `
  query usersBySub($sub: String!) {
    usersBySub(sub: $sub) {
      items {
        id
        firstname
        lastname
        email
      }
    }
  }
`;

const createListingMutation = /* GraphQL */ `
  mutation createCalendarListing($input: CreateCalendarListingInput!) {
    createCalendarListing(input: $input) {
      id
      title
      body
      city
      state
      gallery
      publishDate
      eventDate
      teardownDate
      approval
      isPublished
    }
  }
`;

function CreateCalendarListing({ user, signOut }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isListingCreated, setIsListingCreated] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(""); // Toast message to display
  const [isSubmitting, setIsSubmitting] = useState(false); // Flag to indicate if the form is submitting
  const [uploadImage, setUploadImage] = useState(null);
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventDate: "",
      title: "",
      city: "",
      state: "",
      body: "",
      gallery: "",
    },
  });

  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data, errors } = await API.graphql({
          query: getUser,
          variables: {
            sub: user.attributes.sub,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
        if (!errors) {
          setCurrentUser(data["usersBySub"].items[0]);
        } else {
          throw new Error("Get User Error");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getUserId();
  }, [user]);

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

  function formatDateToAWSDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();

    // Add 1 to month because months are zero-indexed in JavaScript
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  async function createListing(data) {
    //publish Date
    const pd = new Date(data.eventDate);
    pd.setDate(pd.getDate() - 7);
    const request = { ...data };
    request.eventDate = formatDateToAWSDate(data.eventDate);
    request.userListingsId = currentUser.id;
    request.publishDate = formatDateToAWSDate(pd);
    request.teardownDate = request.eventDate;

    console.log("create Listing request:", request);

    try {
      const { data, errors } = await API.graphql({
        query: createListingMutation,
        variables: {
          input: request,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      if (!errors) {
        return data["createCalendarListing"].id;
      } else {
        throw new Error("Create Listing Error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit(data) {
    console.log(data);
    try {
      setIsSubmitting(true);
      const listingId = await createListing(data);
      console.log("ListingId:", listingId);
      if (listingId) {
        data.id = listingId;
        const request = {};
        request.subject = "Moderation Request";
        request.body = `Moderation Request from ${currentUser.firstname} ${currentUser.lastname} for Calendar Listing ${listingId}`;
        request.senderEmail = user.attributes.email;
        request.recipients = ["@Admin"];
        request.isModeration = true;
        request.moderationType = "calendar";
        request.moderation = JSON.stringify(data, null, 2);

        await sendMessage(request);
      }
      setIsSubmitting(false);
      setToastMessage("Your listing is pending approval.");
      showToast();
    } catch (err) {
      console.log(err);
    }
  }

  function onCancel() {
    reset();
    router.push("/calendar");
  }

  const onSuccess = async ({ key }) => {
    const credentials = await Auth.currentCredentials();
    setUploadImage(`${credentials.identityId}/${key}`);
  };

  // Function to show the toast message
  const showToast = () => {
    setToastVisible(true);

    // Automatically hide the toast after 2 seconds
    setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  useEffect(() => {
    async function getImage(uploadImage) {
      if (uploadImage) {
        try {
          const [identityId, key] = uploadImage.split("/");
          const image = await Storage.get(key, { identityId, level: "protected" });
          setImage(image);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getImage(uploadImage);
  }, [uploadImage]);

  return (
    <RequireAuth>
      <Flex width={"100%"} alignItems={"center"} direction={"column"}>
        <form className={styles.metadataForm} onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={"10px"} alignItems={"center"} direction={"column"}>
            <Card width={"100%"} variation="outlined" paddingBottom={"30px"}>
              <Text padding="20px 0px" fontWeight={"bold"}>
                Calendar Listing
              </Text>
              <TextField id="eventDate" type="date" label="Event Date" {...register("eventDate", { required: true })} />
              {errors.eventDate && <span className={styles.error}>This field is required</span>}
              <TextField
                className={styles.metadata}
                id="title"
                type="text"
                label="Title"
                {...register("title", { required: true })}
              />
              {errors.title && <span className={styles.error}>This field is required</span>}
              <TextField
                className={styles.metadata}
                id="city"
                type="text"
                label="City"
                {...register("city", { required: true })}
              />
              {errors.city && <span className={styles.error}>This field is required</span>}
              <TextField
                className={styles.metadata}
                id="state"
                type="text"
                label="State"
                {...register("state", { required: true })}
              />
              {errors.city && <span className={styles.error}>This field is required</span>}
              <TextField
                className={styles.metadata}
                id="venue"
                type="text"
                label="Venue"
                {...register("gallery", { required: true })}
              />
              {errors.venue && <span className={styles.error}>This field is required</span>}
              <TextAreaField id="body" type="text" label="Listing Detail" {...register("body", { required: true })} />
              {errors.body && <span className={styles.error}>This field is required</span>}
              <Flex direction={"column"}>
                <Text>Listing Image</Text>
                <Flex>
                  {!image && (
                    <FileUploader
                      onSuccess={onSuccess}
                      variation="drop"
                      acceptedFileTypes={["image/*"]}
                      accessLevel="protected"
                    />
                  )}

                  {image && (
                    <View className={styles.imageContainer} width={125} height={125}>
                      <Image src={image} layout="fill" objectFit="contain" alt="calendar image" />
                    </View>
                  )}
                </Flex>
              </Flex>
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
            <Flex>
              <Button
                onClick={() => onCancel()}
                className={styles.formButton}
                variation="error"
                type="reset"
                value="cancel"
              >
                Cancel
              </Button>
              <Button className={styles.formButton} variation="primary" type="submit" value="save">
                {isSubmitting ? <Loader /> : "Submit for Approval"}
              </Button>
            </Flex>
          </View>
        </form>
      </Flex>
    </RequireAuth>
  );
}

export default CreateCalendarListing;
