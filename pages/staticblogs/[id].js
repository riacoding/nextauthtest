import Head from "next/head";
import { Amplify, API, withSSRContext } from "aws-amplify";
import { listBlogs, getBlog } from "../../src/graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import styles from "../../styles/Home.module.css";

export async function getStaticPaths() {
  console.log("GetStaticPaths");
  const SSR = withSSRContext();
  try {
    let paths = [];
    const { data } = await SSR.API.graphql({
      query: listBlogs,
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });
    console.log("blogs id data", data);
    if (data) {
      paths = data.listBlogs.items.map((blog) => ({
        params: { id: blog.id },
      }));
    }
    console.log("paths", paths);
    return {
      fallback: true,
      paths,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticProps({ params }) {
  const SSR = withSSRContext();
  try {
    const { data } = await SSR.API.graphql({
      query: getBlog,
      variables: {
        id: params.id,
      },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });

    return {
      props: {
        blog: data.getBlog,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.log(err);
  }
}

export default function Blog({ blog }) {
  if (!blog) return;

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Static Blog: {blog.name}</h1>
      </main>
    </div>
  );
}
