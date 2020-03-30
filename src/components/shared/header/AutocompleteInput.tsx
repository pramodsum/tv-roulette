import React from "react";
import {
  TextField,
  createStyles,
  withStyles,
  Theme,
  fade,
  Box,
  Avatar
} from "@material-ui/core";
import MaterialAutocomplete from "@material-ui/lab/Autocomplete";
import Search from "@material-ui/icons/Search";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import matchSorter from "match-sorter";
import throttle from "lodash/throttle";
import { useHistory } from "react-router-dom";

import {
  MOVIEDB_API_KEY,
  MOVIEDB_API_URL_BASE,
  TRAKT_API_URL_BASE,
  TRAKT_API_KEY
} from "../../../declarations/constants";
import { Series } from "../../../declarations/moviedb-types";

const SearchIcon = withStyles(
  createStyles({
    root: {
      color: "white"
    }
  })
)(Search);

const Input = withStyles((theme: Theme) =>
  createStyles({
    root: {
      background: fade("#fff", 0.15),
      borderRadius: "4px",
      marginTop: "4px"
    },
    input: {
      color: "white !important",
      // vertical padding + font size from searchIcon
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch"
      }
    }
  })
)(TextField);

const Autocomplete = withStyles(
  createStyles({
    root: { minWidth: "300px" },
    inputRoot: {
      color: "white",
      minWidth: "200px"
    }
  })
)(
  // @ts-ignore
  MaterialAutocomplete
);

const AutocompleteInput: React.FC = () => {
  const [options, setOptions] = React.useState<Series[]>([]);
  const [input, updateInput] = React.useState<string>("");
  const history = useHistory();

  React.useEffect(
    throttle(() => {
      if (input?.length === 0) {
        setOptions([]);
        return;
      }

      fetch(
        `${MOVIEDB_API_URL_BASE}/search/tv?api_key=${MOVIEDB_API_KEY}&language=en-US&include_adult=false&query=${input}`
      )
        .then((res: any) => res.json())
        .then((res: any) => {
          setOptions(
            res.results.sort((show1: Series, show2: Series) => {
              if (show1.popularity < show2.popularity) return -1;
              if (show1.popularity > show2.popularity) return 1;
              return 0;
            })
          );
        });
    }, 500),
    [input]
  );

  const onShowSelect = (_e: any, show: Series) => {
    fetch(`${TRAKT_API_URL_BASE}/search/tmdb/${show.id}?type=show`, {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": TRAKT_API_KEY
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.length === 0) return;
        const traktShow = res[0];
        history.push(`/${traktShow.show.ids.slug}/${show.id}`);
      });
  };

  return (
    <Autocomplete
      autoComplete
      clearOnEscape
      includeInputInList
      onChange={onShowSelect}
      getOptionLabel={(option: Series) => option.name}
      options={options}
      filterOptions={(
        options: Series[],
        { inputValue }: { inputValue: string }
      ) => {
        return matchSorter(options, inputValue, {
          keys: [show => show.name]
        });
      }}
      renderOption={(option: Series, { inputValue }: any) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);

        return (
          <Box display="flex" alignItems="center">
            {option.poster_path && (
              <Box mr={1}>
                <Avatar
                  alt={option.name}
                  src={`https://image.tmdb.org/t/p/w500_and_h282_face${option.poster_path}`}
                />
              </Box>
            )}
            {parts.map((part: any, index: number) => (
              <span
                key={index}
                style={{ fontWeight: part.highlight ? 700 : 400 }}
              >
                {part.text}
              </span>
            ))}
          </Box>
        );
      }}
      renderInput={(params: any) => (
        <Input
          {...params}
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateInput(e.target.value)
          }
          variant="outlined"
          margin="dense"
          placeholder="Find a show..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Box ml={1} display="flex" alignItems="center">
                <SearchIcon />
              </Box>
            ),
            endAdornment: null
          }}
        />
      )}
    />
  );
};

export default AutocompleteInput;
