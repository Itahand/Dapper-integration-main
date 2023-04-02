/** @format */

import Head from "next/head";
import styles from "@/styles/Home.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>My Crypto Card Shop</title>
      </Head>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <a href='/about'>About</a>
            </li>
            <li>
              <a href='/contact'>Connect your wallet</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>© 2023 My Crypto Card Shop</footer>
    </>
  );
};

export default Layout;
