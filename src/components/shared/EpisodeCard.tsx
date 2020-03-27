import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box
} from "@material-ui/core";

import { Episode } from "../../declarations/types";
import CircularRating from "./CircularRating";
import dayjs from "dayjs";

const EpisodeCard: React.FC<Episode> = props => (
  <Card>
    <Box display="flex" flexDirection={["column", "row-reverse"]}>
      {props.still_path && (
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500_and_h282_face${props.still_path}`}
          title={props.name}
        />
      )}
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontWeight="bolder"
          lineHeight={1}
        >
          <Typography gutterBottom variant="h5" component="h2">
            <Box fontWeight="bolder">{props.name}</Box>
          </Typography>
          <CircularRating
            voteAverage={Math.round(props.vote_average * 10)}
            prependSubtitle
          />
        </Box>
        <Typography gutterBottom variant="body1">
          <Box fontWeight="600">
            Season {props.season_number} Episode {props.episode_number}
          </Box>
        </Typography>
        <Typography gutterBottom variant="body2">
          {dayjs(props.air_date).fromNow}
        </Typography>
        <Typography gutterBottom variant="body2">
          {props.overview}
        </Typography>
      </CardContent>
    </Box>
  </Card>
);

export default EpisodeCard;
