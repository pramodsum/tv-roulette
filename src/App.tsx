import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Route, BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Home from "./components/Home";

export default () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light"
        }
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>TESTING</>
      <BrowserRouter>
        <Route path="/" component={Home} />
        <Route path="/:seriesId" component={Home} />
        <Route path="/:seriesId/episode/:episodeId" component={Home} />
      </BrowserRouter>
      {/* <Routes /> */}
    </ThemeProvider>
  );
};
