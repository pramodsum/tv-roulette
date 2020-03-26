import React from "react";
import { Box, makeStyles, createStyles, Theme, fade } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AutocompleteInput from "./AutocompleteInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    }
  })
);

const Search: React.FC = () => {
  const classes = useStyles();
  const [options, setOptions] = React.useState<any[]>([]);
  const [input, updateInput] = React.useState<string>("");
  const [loading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (input.length === 0) return;
    setIsLoading(true);
    fetch("https://country.register.gov.uk/records.json?page-size=5000")
      .then(res => res.json())
      .then(countries => {
        setOptions(Object.keys(countries).map(key => countries[key].item[0]));
        setIsLoading(false);
      });
  }, [input]);

  return (
    <Box className={classes.search}>
      <Box className={classes.searchIcon}>
        <SearchIcon />
      </Box>
      <AutocompleteInput
        loading={loading}
        options={options}
        value={input}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          updateInput(event?.target.value);
        }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
      />
    </Box>
  );
};

export default Search;
