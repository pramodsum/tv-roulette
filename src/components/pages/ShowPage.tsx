import React from "react";
import { CardMedia, Box, Typography } from "@material-ui/core";
import styled from "@emotion/styled";

import { SeriesDetail } from "../../declarations/types";
import { API_KEY, API_URL_BASE } from "../../declarations/constants";
import { useParams } from "react-router-dom";
import Layout from "../shared/layout/Layout";
import CircularRating from "../shared/CircularRating";

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
  display: block;
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

const ShowPage: React.FC = () => {
  const { seriesId } = useParams();
  const [showInfo, updateShowInfo] = React.useState<SeriesDetail>();

  React.useEffect(() => {
    fetch(`${API_URL_BASE}/tv/${seriesId}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(res => updateShowInfo(res));
  }, [seriesId]);

  return (
    <Layout>
      {showInfo && (
        <>
          <MediaContainer>
            <Box maxWidth="1000px" mx="auto" pt="40px" pb="40px" zIndex={0}>
              <Box display="flex" alignItems="flex-start" flexWrap="nowrap">
                <PosterContainer>
                  <Box width="100%" height="100%">
                    <Poster
                      srcSet={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${showInfo.poster_path} 1x, https://image.tmdb.org/t/p/w600_and_h900_bestv2${showInfo.poster_path} 2x`}
                    />
                  </Box>
                </PosterContainer>
                <Box
                  display="flex"
                  flexDirection="column"
                  minHeight="450px"
                  color="white"
                  maxWidth="700px"
                  pl="40px"
                >
                  <Typography variant="h2">
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      width="100%"
                      alignItems="flex-start"
                      box-sizing="border-box"
                      mb="30px"
                      fontWeight="900"
                    >
                      {showInfo.name}
                      <CircularRating
                        voteAverage={showInfo.vote_average * 10}
                      />
                    </Box>
                  </Typography>
                  <Typography variant="h5">
                    <Box fontWeight="700">Overview</Box>
                  </Typography>
                  <Typography variant="body1">
                    <Box fontWeight="200">{showInfo.overview}</Box>
                  </Typography>
                  <Typography></Typography>
                </Box>
              </Box>
            </Box>
          </MediaContainer>
        </>
      )}
    </Layout>
  );
};
export default ShowPage;
