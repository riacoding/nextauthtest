import { Amplify, Auth, withSSRContext } from "aws-amplify";
import config from "../src/aws-exports";

Amplify.configure({ ...config, ssr: true });

function ProtectedSSR({ authenticated, username }) {
  if (!authenticated) {
    return (
      <>
        <h1>Not Authenticated</h1>
      </>
    );
  }
  return (
    <>
      <h1>Hello {username} from SSR route!</h1>
    </>
  );
}

export async function getServerSideProps({ req }) {
  console.log("req", req);
  const SSR = withSSRContext({ req });
  try {
    const cognitoUser = await SSR.Auth.currentAuthenticatedUser();
    console.log("cognito user", cognitoUser.attributes.email);
    return {
      props: {
        authenticated: true,
        username: cognitoUser.attributes.email,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/protected",
        permanent: false,
      },
    };
  }
}
export default ProtectedSSR;
