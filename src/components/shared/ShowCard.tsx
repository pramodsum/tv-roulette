import React from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
  Box
} from "@material-ui/core";

import { Series } from "../../declarations/types";

const ShowCard: React.FC<Series> = props => (
  <Box width="30%" my={1}>
    <Card>
      <CardActionArea href={`/${props.id}`}>
        <CardMedia
          style={{ height: "140px" }}
          image={`https://image.tmdb.org/t/p/w500_and_h282_face${props.poster_path}`}
          title={props.name}
        />
        <CardContent>
          <Box display="flex">
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Chip
              size="small"
              color="secondary"
              style={{ marginTop: "2px", marginLeft: "6px" }}
              label={props.vote_average}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  </Box>
);

export default ShowCard;
