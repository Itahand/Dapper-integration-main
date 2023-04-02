/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { RecoilRoot } from "recoil";
import Layout from "../components/common/layout";
import NavigationBar from "../components/NavigationBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <NavigationBar />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
