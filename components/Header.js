import React from "react";
import Link from "next/link";
import { Auth } from "aws-amplify";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <ul className={styles.menu}>
      <li>
        <Link className={styles.menuItem} href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className={styles.menuItem} href="/messages">
          Messages
        </Link>
      </li>
      <li>
        <Link className={styles.menuItem} href="/calendar">
          Calendar
        </Link>
      </li>
      <li>
        <Link className={styles.menuItem} href="/protected">
          Protected
        </Link>
      </li>
      <li>
        <Link className={styles.menuItem} href="/protectedssr">
          Protected SSR
        </Link>
      </li>
      <li>
        <Link className={styles.menuItem} href="/blogs">
          Client Side Blogs
        </Link>
      </li>
      <li>
        <Link className={styles.menuItem} href="/staticblogs">
          Static Blogs
        </Link>
      </li>
      <li>
        <Link className={styles.menuItem} href="/about">
          About
        </Link>
      </li>
      <li>
        <span className={styles.logout} onClick={() => Auth.signOut()}>
          Logout
        </span>
      </li>
    </ul>
  );
}
