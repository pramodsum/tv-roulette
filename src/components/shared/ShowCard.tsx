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

import { SeriesDetail } from "../../declarations/moviedb-types";
import { Link } from "react-router-dom";
import {
  MOVIEDB_API_URL_BASE,
  MOVIEDB_API_KEY
} from "../../declarations/constants";
import { TraktExtended } from "../../declarations/trakt-types";

const ShowCard: React.FC<{ traktShow: TraktExtended }> = ({ traktShow }) => {
  const [show, updateShow] = React.useState<SeriesDetail>();

  React.useEffect(() => {
    fetch(
      `${MOVIEDB_API_URL_BASE}/tv/${traktShow.ids.tmdb}?api_key=${MOVIEDB_API_KEY}`
    )
      .then(res => res.json())
      .then(updateShow);
  }, [traktShow]);

  return show && show.poster_path ? (
    <Box width={["100%", "30%"]} my={1}>
      <Card>
        <CardActionArea>
          <Link
            to={`${traktShow.ids.slug}/${traktShow.ids.tmdb}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <CardMedia
              style={{ height: "140px" }}
              image={`https://image.tmdb.org/t/p/w500_and_h282_face${show.poster_path}`}
              title={show.name}
            />
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography gutterBottom variant="h5" component="h2">
                  {show.name}
                </Typography>
                <Chip
                  color="primary"
                  style={{ marginTop: "2px", marginLeft: "6px" }}
                  label={`${(traktShow.rating * 10).toFixed(0)}%`}
                />
              </Box>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Box>
  ) : null;
};

export default ShowCard;
