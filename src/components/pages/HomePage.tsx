import React from "react";
import Layout from "../shared/layout/Layout";
import { Box, Typography } from "@material-ui/core";
import { Series } from "../../declarations/types";
import { API_KEY, API_URL_BASE } from "../../declarations/constants";
import ShowCard from "../shared/ShowCard";

const HomePage: React.FC = () => {
  const [trendingShows, updateTrendingShows] = React.useState<Series[]>([]);

  React.useEffect(() => {
    fetch(`${API_URL_BASE}/trending/tv/week?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(res => updateTrendingShows(res.results));
  }, []);

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        px={5}
        maxWidth="1000px"
        mx="auto"
      >
        <Typography variant="h5">Trending Shows</Typography>
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
