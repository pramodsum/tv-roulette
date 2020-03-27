import React from "react";
import { Toolbar, Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ReactGA from "react-ga";

import Header from "../header/Header";
import ScrollTop from "./ScrollTop";
import { useLocation } from "react-router-dom";

const Layout: React.FC = ({ children, ...props }) => {
  const location = useLocation();
  ReactGA.initialize("UA-162050139-1");
  ReactGA.pageview(location.pathname + location.search);

  return (
    <>
      <Header />
      <Toolbar id="back-to-top-anchor" />
      {children}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Layout;
