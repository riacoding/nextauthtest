import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Amplify, API, Auth } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { getBlog } from "../../src/graphql/queries";
import styles from "../../styles/Home.module.css";

export default function BlogDetail() {
  const [blog, setBlog] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function getBlogData() {
      try {
        console.log("Current user", await Auth.currentAuthenticatedUser());
        console.log("Current user Credentials", await Auth.currentCredentials());
      } catch (err) {
        console.log("user not authenticated");
      }
      const result = await API.graphql({
        query: getBlog,
        variables: { id: router.query.id },
        authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
      });
      console.log("blog", result);
      setBlog(result.data.getBlog);
    }
    getBlogData();
  }, [router.query.id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Client Side Blog: {blog.name}</h1>
      </main>
    </div>
  );
}
