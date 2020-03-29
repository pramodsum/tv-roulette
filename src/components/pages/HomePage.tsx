import React from "react";
import { Box, Typography } from "@material-ui/core";

import Layout from "../shared/layout/Layout";
import ShowList from "../shared/ShowList";
import FilterToggleGroup from "../shared/FilterToggleGroup";
import TimeSlider from "../shared/TimeSlider";
import { FilterObj, TimeFrame } from "../../declarations/types";

const FILTERS: FilterObj[] = [
  { filter: "watched", title: "Most Watched" },
  { filter: "popular", title: "Popular" },
  { filter: "trending", title: "Trending" }
];

const HomePage: React.FC = () => {
  const [filterIndex, toggleFilterIndex] = React.useState<number>(0);
  const [timeFrame, toggleTimeFrame] = React.useState<TimeFrame>("All");

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        px={5}
        maxWidth="1000px"
        mx="auto"
        mt={3}
      >
        <Typography variant="h3">
          <Box fontWeight="bolder" my={2}>
            {FILTERS[filterIndex].title} Shows
          </Box>
        </Typography>
        <Box
          display="flex"
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          mb={2}
        >
          <FilterToggleGroup
            filterIndex={filterIndex}
            toggleFilterIndex={toggleFilterIndex}
          />
          <TimeSlider toggleTimeFrame={toggleTimeFrame} />
        </Box>
        <ShowList filter={FILTERS[filterIndex].filter} timeFrame={timeFrame} />
      </Box>
    </Layout>
  );
};

export default HomePage;
