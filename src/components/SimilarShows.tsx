import React from "react";
import { Box, Typography } from "@material-ui/core";
import ShowCard from "./shared/ShowCard";
import { TRAKT_API_URL_BASE, TRAKT_API_KEY } from "../declarations/constants";
import { TraktShow } from "../declarations/trakt-types";

const SimilarShows: React.FC<{ traktId: number }> = ({ traktId }) => {
  const [shows, updateShows] = React.useState<TraktShow[]>([]);

  React.useEffect(() => {
    fetch(`${TRAKT_API_URL_BASE}/shows/${traktId}/related`, {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": TRAKT_API_KEY
      }
    })
      .then(res => res.json())
      .then(updateShows);
  }, [traktId]);

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
        {shows.map((show: TraktShow) => (
          <ShowCard key={show.ids.trakt} traktShow={show} />
        ))}
      </Box>
    </Box>
  );
};

export default SimilarShows;
