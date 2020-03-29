import React from "react";
import { CardMedia, Box, Typography, Chip } from "@material-ui/core";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

import { SeriesDetail } from "../declarations/moviedb-types";
import CircularRating from "./shared/CircularRating";

const MediaContainer = styled(CardMedia)({
  "&::before": {
    filter: "opacity(100%) grayscale(100%) contrast(130%)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%",
    backgroundImage:
      "url(https://image.tmdb.org/t/p/w1400_and_h450_face/yGNnjoIGOdQy3douq60tULY8teK.jpg)",
    willChange: "opacity",
    transition: "filter 1s"
  },
  marginTop: "-20px",
  width: "100%",
  position: "relative",
  padding: "0 20px",
  background:
    "radial-gradient(circle at 20% 50%, rgba(23.92%, 16.86%, 12.16%, 0.98) 0%, rgba(30.59%, 23.92%, 19.22%, 0.88) 100%)"
});

const PosterContainer = styled(Box)`
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  border-width: 0px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const Poster = styled.img`
  display: block;
  max-width: 300px;
  width: 100%;
  border-width: 0px;
  outline: none;
`;

const Detail: React.FC<{ title: string; value: string }> = ({
  title,
  value
}) => (
  <Box display="flex" mb={1}>
    <Box fontSize="16px" fontWeight="bolder">
      {title}:
    </Box>
    <Box fontSize="16px" ml={1}>
      {value}
    </Box>
  </Box>
);

const MediaHeader: React.FC<SeriesDetail> = ({
  name,
  vote_average,
  genres,
  overview,
  episode_run_time,
  last_air_date,
  poster_path
}) => {
  dayjs.extend(RelativeTime);

  return (
    <MediaContainer>
      <Box maxWidth="1000px" mx="auto" pt="40px" pb="40px" zIndex={0}>
        <Box display="flex" alignItems="flex-start" flexWrap="nowrap">
          <PosterContainer display={["none", "block"]}>
            <Box width="100%" height="100%">
              <Poster
                srcSet={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path} 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path} 2x`}
              />
            </Box>
          </PosterContainer>
          <Box
            display="flex"
            flexDirection="column"
            color="white"
            maxWidth="700px"
            pl={[0, "40px"]}
          >
            <Typography variant="h2">
              <Box
                display="flex"
                flexWrap="wrap"
                width="100%"
                alignItems="flex-start"
                box-sizing="border-box"
                mb="20px"
                fontWeight="900"
              >
                {name}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width={["100%", "auto"]}
                >
                  <CircularRating voteAverage={vote_average * 10} />
                </Box>
              </Box>
            </Typography>
            <Box mb={2} display="flex">
              {genres.map(genre => (
                <Box mr={1} key={genre.id}>
                  <Chip color="inherit" label={genre.name} />
                </Box>
              ))}
            </Box>
            <Detail
              title="Last Air Date"
              value={`${dayjs(last_air_date).fromNow()}`}
            />
            <Detail
              title="Episode Run Time"
              value={`${episode_run_time.reduce((a, b) => a + b) /
                episode_run_time.length} minutes`}
            />
            <Typography variant="h5">
              <Box fontWeight="700">Overview</Box>
            </Typography>
            <Typography variant="body1">
              <Box fontWeight="200">{overview}</Box>
            </Typography>
            <Typography></Typography>
          </Box>
        </Box>
      </Box>
    </MediaContainer>
  );
};

export default MediaHeader;
