import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import HomePage from "./components/pages/HomePage";
import ShowPage from "./components/pages/ShowPage";

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
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:seriesId" component={ShowPage} />
          {/* <Route path="/:seriesId/episode/:episodeId" component={HomePage} /> */}
        </Switch>
      </BrowserRouter>
      {/* <Routes /> */}
    </ThemeProvider>
  );
};
