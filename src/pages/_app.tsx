import MenuBar from "@/components/menu-bar";
import "@/styles/globals.css";
import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Poke-challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MenuBar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
