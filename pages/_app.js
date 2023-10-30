import "../styles/globals.css";
import { Amplify, Auth } from "aws-amplify";
import { ThemeProvider, Authenticator } from "@aws-amplify/ui-react";
import Header from "../components/Header";
import config from "../src/aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { theme } from "../styles/naptheme";

Auth.configure({
  authenticationFlowType: "CUSTOM_AUTH",
});
Amplify.configure({ ...config, ssr: true });
//Amplify.Logger.LOG_LEVEL = "DEBUG";
function MyApp({ Component, pageProps }) {
  return (
    <Authenticator.Provider>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </Authenticator.Provider>
  );
}

export default MyApp;
