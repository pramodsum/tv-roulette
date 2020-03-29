import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Box } from "@material-ui/core";
import { FilterObj } from "../../declarations/types";

const FILTERS: FilterObj[] = [
  { filter: "watched", title: "Most Watched" },
  { filter: "popular", title: "Popular" },
  { filter: "trending", title: "Trending" }
];

const FilterToggleGroup: React.FC<{
  filterIndex: number;
  toggleFilterIndex: React.Dispatch<number>;
}> = ({ filterIndex, toggleFilterIndex }) => (
  <ToggleButtonGroup
    exclusive
    value={filterIndex}
    onChange={(_e, newIndex) => toggleFilterIndex(newIndex)}
  >
    {FILTERS.map((filterObj, index) => (
      <ToggleButton key={index} value={index}>
        <Box mx={1}>{filterObj.title}</Box>
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);

export default FilterToggleGroup;
