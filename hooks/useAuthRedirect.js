import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Auth, Hub } from "aws-amplify";

export default function useAuthRedirect() {
  const [authStatus, setAuthStatus] = useState("configuring");
  const [cognitoUser, setCognitoUser] = useState(null);
  const [authEvent, setAuthEvent] = useState(null);
  const router = useRouter();
  Hub.listen("auth", (data) => {
    const event = data.payload.event;
    setAuthEvent(event);
  });

  useEffect(() => {
    async function checkUser() {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        setCognitoUser(cognitoUser);
        setAuthStatus("authenticated");
      } catch (err) {
        setAuthStatus("unauthenticated");
        setCognitoUser(null);
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    async function getCurrentUser() {
      if (authEvent === "signIn") {
        try {
          const cognitoUser = await Auth.currentAuthenticatedUser();
          setCognitoUser(cognitoUser);
          setAuthStatus("authenticated");
        } catch (err) {
          setAuthStatus("unauthenticated");
        }
      }

      if (authEvent === "signOut") {
        setAuthStatus("unauthenticated");
        setCognitoUser(null);
      }
    }

    getCurrentUser();
  }, [authEvent]);

  return { authStatus, cognitoUser, signOut: Auth.signOut };
}
