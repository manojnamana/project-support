import * as React from "react";
import { Box, type BoxProps } from "@mui/material";

interface RevealProps extends BoxProps {
  delay?: number;
}

// Lightweight scroll/enter reveal that fades content up smoothly once it is
// near the viewport. Falls back to visible if IntersectionObserver is missing.
export default function Reveal({ delay = 0, children, sx, ...rest }: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: (t) =>
          `opacity .6s ${t.transitions.easing.easeOut} ${delay}ms, transform .6s ${t.transitions.easing.easeOut} ${delay}ms`,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
