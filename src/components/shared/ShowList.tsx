import React from "react";
import { Box } from "@material-ui/core";
import ShowCard from "../shared/ShowCard";
import { TraktShow, TraktShowWithStats } from "../../declarations/trakt-types";
import {
  TRAKT_API_KEY,
  TRAKT_API_URL_BASE
} from "../../declarations/constants";

const ShowList: React.FC<{
  filter: string;
  timeFrame: string;
}> = ({ filter, timeFrame }) => {
  const [shows, updateShows] = React.useState<TraktShow[]>([]);

  React.useEffect(() => {
    fetch(
      `${TRAKT_API_URL_BASE}/shows/${filter}/?period=${timeFrame.toLowerCase()}`,
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": TRAKT_API_KEY
        }
      }
    )
      .then(res => res.json())
      .then(res =>
        filter === "popular"
          ? updateShows(res)
          : updateShows(res.map((result: TraktShowWithStats) => result.show))
      );
  }, [filter, timeFrame]);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      width="100%"
      mx="auto"
      justifyContent="space-between"
    >
      {shows?.map((show: TraktShow) => (
        <ShowCard key={show.ids.tmdb} showId={show.ids.tmdb} />
      ))}
    </Box>
  );
};

export default ShowList;
