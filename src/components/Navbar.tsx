import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Report a Concern", href: "/report" },
  { label: "Check Status", href: "/status" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Admin", href: "/dashboard" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  const isActive = (href: string) =>
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href);

  return (
    <AppBar
      position="sticky"
      sx={{
        backdropFilter: "saturate(180%) blur(12px)",
        backgroundColor: trigger ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.6)",
        borderBottom: "1px solid",
        borderColor: trigger ? "divider" : "transparent",
        transition: "all .3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <Link href="/" aria-label="Project SUPPORT home">
            <Logo />
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: isActive(link.href) ? "primary.main" : "text.secondary",
                  fontWeight: isActive(link.href) ? 700 : 600,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 16,
                    right: 16,
                    bottom: 6,
                    height: 2,
                    borderRadius: 2,
                    backgroundColor: "primary.main",
                    transform: isActive(link.href) ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                    transition: "transform .25s cubic-bezier(0.16,1,0.3,1)",
                  },
                  "&:hover::after": { transform: "scaleX(1)" },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              component={Link}
              href="/report"
              variant="contained"
              startIcon={<CampaignRoundedIcon />}
              sx={{ ml: 1 }}
            >
              Report Now
            </Button>
          </Stack>

          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            aria-label="Open navigation menu"
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 280, p: 1 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1.5, py: 1.5 }}
        >
          <Logo />
          <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              selected={isActive(link.href)}
              onClick={() => setOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontWeight: isActive(link.href) ? 700 : 600,
                }}
              />
            </ListItemButton>
          ))}
        </List>
        <Button
          component={Link}
          href="/report"
          variant="contained"
          fullWidth
          startIcon={<CampaignRoundedIcon />}
          onClick={() => setOpen(false)}
          sx={{ mt: 1 }}
        >
          Report Now
        </Button>
      </Drawer>
    </AppBar>
  );
}
