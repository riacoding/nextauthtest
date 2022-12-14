import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Amplify, API, withSSRContext } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { listBlogs } from "../../src/graphql/queries";
import config from "../../src/aws-exports";
import styles from "../../styles/Home.module.css";

export async function getStaticProps() {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({ query: listBlogs, authMode: GRAPHQL_AUTH_MODE.AWS_IAM });
  console.log("Blogs GSProps", data);
  return {
    props: {
      blogs: data.listBlogs.items,
    },
    revalidate: 10,
  };
}

export default function StaticBlogs({ blogs }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Blogs</h1>
        {blogs &&
          blogs.map((blog) => {
            return (
              <Link key={blog.id} href={`/staticblogs/${blog.id}`}>
                <a>
                  <p>{blog.name}</p>
                </a>
              </Link>
            );
          })}
      </main>
    </div>
  );
}
