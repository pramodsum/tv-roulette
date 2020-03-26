import React from "react";
import { Toolbar, Fab } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import Header from "../header/Header";
import ScrollTop from "./ScrollTop";

const Layout: React.FC = ({ children, ...props }) => {
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
