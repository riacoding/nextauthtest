// RequireAuth.js
import { useRouter } from "next/router";
import useAuthRedirect from "../hooks/useAuthRedirect";
import Login from "../pages/login";

export function RequireAuth({ children }) {
  const { authStatus, cognitoUser, signOut } = useAuthRedirect();
  const router = useRouter();
  if (authStatus === "unauthenticated") {
    return <Login />;
  }
  return authStatus !== "configuring" ? children : null;
}
