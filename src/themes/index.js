import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#DC000C",
    },
    divider: "#707070",
    common: {
      black: "#151515",
      white: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#8B8B8B",
    },
  },
  overrides: {
    MuiTab: {
      root: {
        fontSize: 10
      },
      labelIcon: {
        minHeight: "unset",
      },
      wrapper: {
        marginBottom: 0,
      },
    },
  },
});

const HEADER_HEIGHT = 60;
const VIDEO_HEIGHT = 260;
const LOGO_HEIGHT = 20;
const LOGO_WIDTH = 105;

export default theme;
export { HEADER_HEIGHT, VIDEO_HEIGHT, LOGO_HEIGHT, LOGO_WIDTH };
