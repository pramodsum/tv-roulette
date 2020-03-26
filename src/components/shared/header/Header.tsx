import React from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Box,
  Toolbar
} from "@material-ui/core";
import LiveTvIcon from "@material-ui/icons/LiveTv";

// import Search from "./Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    }
  })
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Box
          maxWidth="1000px"
          display="flex"
          width="100%"
          justifyContent="space-between"
          mx="auto"
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.title}
          >
            <LiveTvIcon fontSize="large" />
          </IconButton>
          {/* <Search /> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
