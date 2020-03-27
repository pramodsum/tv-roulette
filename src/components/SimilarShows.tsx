import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Series } from "../declarations/types";
import ShowCard from "./shared/ShowCard";
import { API_URL_BASE, API_KEY } from "../declarations/constants";

const SimilarShows: React.FC<{ seriesId: number }> = ({ seriesId }) => {
  const [shows, updateShows] = React.useState<Series[]>([]);

  React.useEffect(() => {
    fetch(`${API_URL_BASE}/tv/${seriesId}/similar?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(res => updateShows(res.results));
  }, [seriesId]);

  return (
    <Box>
      <Typography variant="h6">
        <Box fontWeight="bold">
          Need something else? Check out these similar shows:{" "}
        </Box>
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        width="100%"
        mx="auto"
        justifyContent="space-between"
      >
        {shows.map((show: Series) => (
          <ShowCard key={show.id} {...show} />
        ))}
      </Box>
    </Box>
  );
};

export default SimilarShows;
