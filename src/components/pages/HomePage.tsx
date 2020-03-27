import React from "react";
import Layout from "../shared/layout/Layout";
import { Box, Typography, Divider } from "@material-ui/core";
import { Series } from "../../declarations/types";
import { API_KEY, API_URL_BASE } from "../../declarations/constants";
import ShowCard from "../shared/ShowCard";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";

const HomePage: React.FC = () => {
  const [trendingShows, updateTrendingShows] = React.useState<Series[]>([]);
  const [timeFrame, toggleTimeFrame] = React.useState<"day" | "week">("week");
  const [savedShows, updateSavedShows] = React.useState<Series[]>([]);

  React.useEffect(() => {
    // const storedJson = window.localStorage.getItem("tv-roulette");
    // const savedShowIds = storedJson ? JSON.parse(storedJson) : [];
    // savedShowIds.forEach((showId: number) => {
    //   console.log(showId);
    // });
  }, []);

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
        mt={3}
      >
        {savedShows.length > 0 && (
          <Box mb={3}>
            <Typography variant="h5">Your Favorite Shows</Typography>
            <Box
              display="flex"
              flexWrap="wrap"
              width="100%"
              mx="auto"
              justifyContent="space-between"
            >
              {savedShows.map((show: Series) => (
                <ShowCard key={show.id} {...show} />
              ))}
            </Box>
            <Divider />
          </Box>
        )}
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
          {trendingShows?.map((show: Series) => (
            <ShowCard key={show.id} {...show} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
