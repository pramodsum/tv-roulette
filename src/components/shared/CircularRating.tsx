import React from "react";
import {
  CircularProgress as MaterialCircularProgress,
  Box,
  withStyles,
  createStyles,
  fade
} from "@material-ui/core";
import styled from "@emotion/styled";

const ProgressContainer = styled(Box)`
  border-radius: 100%;
  height: 70px;
  width: 70px;
  padding: 5px;
  background: #081c22;
`;

const Percent = styled(Box)`
  z-index: 2;
  display: flex;
  position: absolute;
  align-items: flex-start;
  font-size: 24px;
  margin-top: 18px;
  margin-left: 15px;
  letter-spacing: -1.5px;
  color: white;
`;

const CircularProgress = withStyles(
  createStyles({
    root: {
      borderRadius: "100%",

      "& svg": {
        margin: "-4px"
      },

      "& circle": {
        strokeLinecap: "round"
      }
    },
    colorPrimary: {
      border: `4px solid ${fade("#fff", 0.1)}`
    }
  })
)(MaterialCircularProgress);

const CircularRating: React.FC<{
  voteAverage: number;
  prependSubtitle?: boolean;
}> = ({ voteAverage, prependSubtitle }) => (
  <Box display="flex" alignItems="center">
    {prependSubtitle && (
      <Box
        ml={1}
        fontSize="16px"
        lineHeight={1}
        fontWeight="bolder"
        letterSpacing="-.5px"
        maxWidth="50px"
        height="100%"
        textAlign="right"
      >
        User Score
      </Box>
    )}
    <ProgressContainer display="flex" ml={prependSubtitle ? 1 : 2}>
      <Percent>
        {voteAverage}
        <Box fontSize="x-small">%</Box>
      </Percent>
      <CircularProgress
        variant="static"
        size="60px"
        thickness={4}
        value={voteAverage}
      />
    </ProgressContainer>
    {!prependSubtitle && (
      <Box
        ml={1}
        fontSize="16px"
        lineHeight={1}
        fontWeight="bolder"
        letterSpacing="-.5px"
        maxWidth="50px"
        height="100%"
      >
        User Score
      </Box>
    )}
  </Box>
);

export default CircularRating;
