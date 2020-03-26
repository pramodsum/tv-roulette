import React from "react";
import {
  CircularProgress as MaterialCircularProgress,
  CircularProgressProps,
  Box,
  withStyles,
  createStyles,
  fade,
  Typography
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
`;

const CircularProgress = withStyles(() =>
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
    },
    barColorPrimary: {
      backgroundColor: "alicepurple"
    }
  })
)(MaterialCircularProgress);

const CircularRating: React.FC<{ voteAverage: number }> = ({ voteAverage }) => (
  <ProgressContainer display="flex" ml={2}>
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
);

export default CircularRating;
