import React from "react";
import EpisodeCard from "./EpisodeCard";
import { Box, Button, CircularProgress } from "@material-ui/core";
import {
  MOVIEDB_API_KEY,
  MOVIEDB_API_URL_BASE
} from "../../declarations/constants";
import { Episode, Season } from "../../declarations/moviedb-types";

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

const RandomEpisode: React.FC<{
  seriesId: number;
  lastEpisodeToAir: Episode;
  selectedSeasons: Season[];
}> = ({ seriesId, lastEpisodeToAir, selectedSeasons }) => {
  const [randomEpisode, updateRandomEpisode] = React.useState<Episode>();

  const getRandomEpisode = function(): {
    season: Season;
    episodeNumber: number;
  } {
    debugger;
    const numPotentialEpisodes = selectedSeasons.reduce(
      (episodes, season) => episodes + season.episode_count,
      0
    );
    const randomEpisodeNumber = getRandomInt(numPotentialEpisodes);
    let episodeCounter = randomEpisodeNumber;

    const selectedEpisodeSeason = selectedSeasons.find(season => {
      if (season.episode_count <= episodeCounter) {
        episodeCounter -= season.episode_count;
        return false;
      }
      return true;
    });
    debugger;

    if (
      !selectedEpisodeSeason ||
      (lastEpisodeToAir.season_number === selectedEpisodeSeason.season_number &&
        lastEpisodeToAir.episode_number < episodeCounter)
    ) {
      return getRandomEpisode();
    }

    return {
      season: selectedEpisodeSeason,
      episodeNumber: episodeCounter
    };
  };

  const fetchNextRandomEpisode = () => {
    const { season, episodeNumber } = getRandomEpisode();

    if (!season || !episodeNumber) return;

    fetch(
      `${MOVIEDB_API_URL_BASE}/tv/${seriesId}/season/${season.season_number}?api_key=${MOVIEDB_API_KEY}`
    )
      .then(res => res.json())
      .then(res => updateRandomEpisode(res.episodes[episodeNumber]));
  };

  React.useEffect(() => {
    fetchNextRandomEpisode();
    // eslint-disable-next-line
  }, [selectedSeasons]);

  return randomEpisode ? (
    <>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => fetchNextRandomEpisode()}
        >
          Find Another Episode
        </Button>
      </Box>
      <Box my={3}>
        <EpisodeCard {...randomEpisode} />
      </Box>
    </>
  ) : (
    <Box my={3}>
      <CircularProgress />
    </Box>
  );
};

export default RandomEpisode;
