import React from "react";
import Link from "next/link";
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
    </ul>
  );
}
