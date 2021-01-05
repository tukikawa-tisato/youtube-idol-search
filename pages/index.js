import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});
const params = {
  part: "snippet",
  maxResults: 40,
  key: KEY,
  regionCode: "JP",
  type: "video",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 2,
  },
  button: {
    fontSize: "16px",
    fontWeight: "bold",
    marginRight: 10,
  },
  movies: {
    marginTop: 30,
  },
  movie: {
    marginTop: 10,
  },
  card: {
    maxWidth: 345,
  },
  cardMedia: {
    height: 140,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);

  const search = (word) => {
    console.log(params);
    youtube
      .get("/search", {
        params: {
          ...params,
          q: word,
          order: "date",
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setMovies(res.data.items);
      });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Yotube アイドル検索
          </Typography>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => search("日向坂46")}
          >
            日向坂46
          </Button>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => search("乃木坂46")}
          >
            乃木坂46
          </Button>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => search("櫻坂46")}
          >
            櫻坂46
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        container
        alignItems="center"
        justify="center"
        spacing={1}
        className={classes.movies}
      >
        {movies &&
          movies.map((movie) => {
            const url = `https://www.youtube.com/watch?v=${movie.id.videoId}`;
            return (
              <Grid
                container
                item
                xs={3}
                spacing={3}
                key={movie.id.videoId}
                className={classes.movie}
              >
                <a href={url}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        alt={movie.snippet.title}
                        image={movie.snippet.thumbnails.medium.url}
                        title={movie.snippet.title}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.movieTitle}
                      >
                        {movie.snippet.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      ></Typography>
                    </CardContent>
                  </Card>
                </a>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
