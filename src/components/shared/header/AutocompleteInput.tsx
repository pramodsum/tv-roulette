import React from "react";
import {
  TextField,
  createStyles,
  withStyles,
  Theme,
  fade,
  Box
} from "@material-ui/core";
import MaterialAutocomplete from "@material-ui/lab/Autocomplete";
import Search from "@material-ui/icons/Search";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import matchSorter from "match-sorter";
import throttle from "lodash/throttle";
import { useHistory } from "react-router-dom";

import { API_KEY, API_URL_BASE } from "../../../declarations/constants";
import { Series } from "../../../declarations/types";

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
        `${API_URL_BASE}/search/tv?api_key=${API_KEY}&language=en-US&include_adult=false&query=${input}`
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

  return (
    <Autocomplete
      autoSelect
      autoComplete
      clearOnEscape
      includeInputInList
      onChange={(_e: any, show: Series) => {
        history.push(`/show/${show.id}`);
      }}
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
          <Box>
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
