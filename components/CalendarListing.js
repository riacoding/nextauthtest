import React from "react";
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
} from "@aws-amplify/ui-react";

export default function CalendarListing({ data }) {
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
