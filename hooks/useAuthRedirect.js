import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
export default function useAuthRedirect() {
  const router = useRouter();
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    console.log("authStatus", authStatus);
    if (authStatus === "configuring" || authStatus === "unauthenticated") {
      window.localStorage.setItem("redirectpath", router.asPath);
      router.replace("/login");
    } else {
      async function getCurrentUser() {
        if (user) {
          await Auth.currentAuthenticatedUser({ bypassCache: false });
        }
      }

      getCurrentUser();
    }
  }, [authStatus, router, user]);

  return { authStatus, user, signOut };
}
