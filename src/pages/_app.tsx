import "@/styles/globals.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "@/theme/theme";
import Layout from "@/components/Layout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>Project SUPPORT — Anonymous School Safety Reporting</title>
        <meta
          name="description"
          content="Project SUPPORT: a safe, confidential way to report school safety concerns."
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
