import React from "react";
import Layout from "../shared/layout/Layout";
import { Box, Typography } from "@material-ui/core";
import { Series } from "../../declarations/types";
import { API_KEY, API_URL_BASE } from "../../declarations/constants";
import ShowCard from "../shared/ShowCard";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";

const HomePage: React.FC = () => {
  const [trendingShows, updateTrendingShows] = React.useState<Series[]>([]);
  const [timeFrame, toggleTimeFrame] = React.useState<"day" | "week">("week");

  React.useEffect(() => {
    fetch(`${API_URL_BASE}/trending/tv/${timeFrame}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(res => updateTrendingShows(res.results));
  }, [timeFrame]);

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        px={5}
        maxWidth="1000px"
        mx="auto"
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Trending Shows</Typography>
          <ToggleButtonGroup
            exclusive
            value={timeFrame}
            onChange={(_e, newTimeFrame) => toggleTimeFrame(newTimeFrame)}
          >
            <ToggleButton value="day">
              <Box mx={1}>Day</Box>
            </ToggleButton>
            <ToggleButton value="week">
              <Box mx={1}>Week</Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          width="100%"
          mx="auto"
          justifyContent="space-between"
        >
          {trendingShows?.map(show => (
            <ShowCard key={show.id} {...show} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
