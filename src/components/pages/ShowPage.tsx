import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";

import {
  SeriesDetail,
  Season,
  Episode
} from "../../declarations/moviedb-types";
import {
  MOVIEDB_API_KEY,
  MOVIEDB_API_URL_BASE,
  TRAKT_API_URL_BASE,
  TRAKT_API_KEY
} from "../../declarations/constants";
import { useParams } from "react-router-dom";
import Layout from "../shared/layout/Layout";
import MediaHeader from "../MediaHeader";
import EpisodeCard from "../shared/EpisodeCard";
import SimilarShows from "../SimilarShows";
import { TraktExtended } from "../../declarations/trakt-types";

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

const ShowPage: React.FC = () => {
  const { tmdbId } = useParams();
  const [showInfo, updateShowInfo] = React.useState<SeriesDetail>();
  const [selectedSeasons, updateSelectedSeasons] = React.useState<Season[]>([]);
  const [randomEpisode, updateRandomEpisode] = React.useState<Episode>();
  const [traktShow, updateTraktShow] = React.useState<TraktExtended>();

  const selectAllRegularSeasons = React.useCallback((res: SeriesDetail) => {
    // Default select all regular seasons
    updateSelectedSeasons(
      res.seasons.filter((season: Season) => season.season_number !== 0)
    );
  }, []);

  React.useEffect(() => {
    fetch(`${MOVIEDB_API_URL_BASE}/tv/${tmdbId}?api_key=${MOVIEDB_API_KEY}`)
      .then(res => res.json())
      .then(res => {
        updateShowInfo(res);
        selectAllRegularSeasons(res);
      });

    fetch(
      `${TRAKT_API_URL_BASE}/search/tmdb/${tmdbId}?type=show&extended=full`,
      {
        headers: {
          "Content-Type": "application/json",
          "trakt-api-version": "2",
          "trakt-api-key": TRAKT_API_KEY
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.length === 0) return;
        updateTraktShow(res[0].show);
      });
  }, [tmdbId, selectAllRegularSeasons]);

  const getRandomEpisode = function(): {
    season: Season;
    episodeNumber: number;
  } {
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

    if (
      !selectedEpisodeSeason ||
      (showInfo &&
        showInfo.last_episode_to_air.season_number ===
          selectedEpisodeSeason.season_number &&
        showInfo.last_episode_to_air.episode_number < episodeCounter)
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
      `${MOVIEDB_API_URL_BASE}/tv/${tmdbId}/season/${season.season_number}?api_key=${MOVIEDB_API_KEY}`
    )
      .then(res => res.json())
      .then(res => updateRandomEpisode(res.episodes[episodeNumber]));
  };

  React.useEffect(() => {
    if (!showInfo) return;
    fetchNextRandomEpisode();
    // eslint-disable-next-line
  }, [selectedSeasons]);

  const onSeasonSelect = (event: React.MouseEvent, newSeasons: Season[]) => {
    event.preventDefault();
    updateSelectedSeasons(newSeasons);
  };

  return (
    <Layout>
      {showInfo && traktShow && (
        <>
          <MediaHeader {...traktShow} {...showInfo} />
          <Box p={3} maxWidth="1000px" mx="auto">
            <Box
              display="flex"
              flexDirection={["column", "row"]}
              justifyContent="space-between"
            >
              <Typography variant="h6" style={{ marginBottom: "10px" }}>
                <Box fontWeight="bolder">Filter Seasons: </Box>
                <ToggleButtonGroup
                  value={selectedSeasons}
                  onChange={onSeasonSelect}
                >
                  {showInfo.seasons.map(season => (
                    <ToggleButton key={season.id} value={season}>
                      <Box px={1}>{season.season_number}</Box>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Typography>
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
            </Box>
            {randomEpisode && (
              <Box my={3}>
                <EpisodeCard {...randomEpisode} />
              </Box>
            )}
            <SimilarShows />
          </Box>
        </>
      )}
    </Layout>
  );
};
export default ShowPage;
