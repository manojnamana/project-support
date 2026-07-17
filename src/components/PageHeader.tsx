import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Reveal from "./Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, subtitle, action }: PageHeaderProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        color: "text.primary",
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 8 },
        bgcolor: "primary.main",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Reveal>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "flex-end" }}
            spacing={3}
          >
            <Box>
              {eyebrow && (
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: "text.secondary",
                    mb: 1,
                  }}
                >
                  {eyebrow}
                </Typography>
              )}
              <Typography variant="h3" sx={{ maxWidth: 720 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1.5, maxWidth: 640 }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
            {action && <Box>{action}</Box>}
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
