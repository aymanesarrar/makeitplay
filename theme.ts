import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const colors = {
  spotify: {
    100: "#1DB954",
    200: "#191414",
    300: "#282828",
    400: "#3D3D3D",
    500: "#B3B3B3",
    600: "#FFFFFF",
  },
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({
  config,
  colors,
  breakpoints,
  fonts: {
    heading: "Circular, sans-serif",
    body: "Circular, sans-serif",
  },
});

export default theme;
