import createCache from "@emotion/cache";

// prepend: true moves MUI styles to the top of the <head> so they're loaded first,
// allowing developers to override MUI styles with other styling solutions if needed.
export default function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
