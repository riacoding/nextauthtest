import "../styles/globals.css";
import { Amplify, Auth } from "aws-amplify";
import Header from "../components/Header";
import config from "../src/aws-exports";

//Amplify.Logger.LOG_LEVEL = "DEBUG";
Auth.configure({
  authenticationFlowType: "USER_PASSWORD_AUTH",
});
Amplify.configure({ ...config, ssr: true });
//Amplify.Logger.LOG_LEVEL = "DEBUG";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
