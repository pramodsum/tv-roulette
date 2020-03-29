import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Series } from "../declarations/moviedb-types";
import ShowCard from "./shared/ShowCard";
import {
  MOVIEDB_API_URL_BASE,
  MOVIEDB_API_KEY
} from "../declarations/constants";

const SimilarShows: React.FC<{ seriesId: number }> = ({ seriesId }) => {
  const [shows, updateShows] = React.useState<Series[]>([]);

  React.useEffect(() => {
    fetch(
      `${MOVIEDB_API_URL_BASE}/tv/${seriesId}/similar?api_key=${MOVIEDB_API_KEY}`
    )
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
          <ShowCard key={show.id} showId={show.id} />
        ))}
      </Box>
    </Box>
  );
};

export default SimilarShows;
