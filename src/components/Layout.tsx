import * as React from "react";
import { useRouter } from "next/router";
import { Box, Fade } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      {/* Keyed fade gives a gentle cross-page transition on navigation. */}
      <Fade in key={router.asPath} timeout={{ enter: 450 }} appear>
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Fade>
      <Footer />
    </Box>
  );
}
