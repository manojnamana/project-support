import { Html, Head, Main, NextScript, type DocumentContext } from "next/document";
import {
  DocumentHeadTags,
  documentGetInitialProps,
  type DocumentHeadTagsProps,
} from "@mui/material-nextjs/v15-pagesRouter";

import theme from "@/theme/theme";
import createEmotionCache from "@/theme/createEmotionCache";

export default function MyDocument(props: DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createEmotionCache(),
  });
  return finalProps;
};
