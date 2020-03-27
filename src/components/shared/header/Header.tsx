import React from "react";
import { AppBar, IconButton, Box, Toolbar } from "@material-ui/core";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import { Link } from "react-router-dom";

import AutocompleteInput from "./AutocompleteInput";

const Header: React.FC = () => (
  <AppBar>
    <Toolbar>
      <Box
        maxWidth="1000px"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        mx="auto"
      >
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Box display="flex" alignItems="center" mt={["-2px", 0]}>
              <LiveTvIcon fontSize="large" />
              <Box ml={1} display={["none", "block"]}>
                TV Roulette
              </Box>
            </Box>
          </Link>
        </IconButton>
        <AutocompleteInput />
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
