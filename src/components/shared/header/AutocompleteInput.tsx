import React from "react";
import { TextField, CircularProgress } from "@material-ui/core";
import Autocomplete, { AutocompleteProps } from "@material-ui/lab/Autocomplete";

interface IProps extends Partial<AutocompleteProps<any>> {
  loading?: boolean;
  options: any[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutocompleteInput: React.FC<IProps> = ({
  loading,
  options,
  value,
  onChange,
  ...props
}) => (
  <Autocomplete
    {...props}
    id="asynchronous-demo"
    style={{ width: 300 }}
    open={!loading && options.length > 0}
    getOptionSelected={(option: any, value: any) => option.name === value.name}
    getOptionLabel={(option: any) => option.name}
    options={options}
    loading={loading}
    renderInput={(params: any) => (
      <TextField
        {...params}
        variant="outlined"
        value={value}
        onChange={onChange}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          )
        }}
      />
    )}
  />
);

export default AutocompleteInput;
