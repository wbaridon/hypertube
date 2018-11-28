import React from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      item: [],
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id_movie;
    console.log(id);
    axios.get(`https://tv-v2.api-fetch.website/movie/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          item: res.data,
        });
      });
  }

  render() {
    const { item } = this.state;
    if (typeof item.images !== 'undefined') {
      return (
        <Card>
          <Typography>
            {`src: ${item.images.poster}`}
          </Typography>
          <CardMedia
            image={item.images.poster}
          />
          <Typography>
            title: {item.title}
          </Typography>
          <Typography>
            Genres: {item.genres}
          </Typography>
          <Typography>
            Synopsis: {item.synopsis}
          </Typography>
          <img src={item.images.poster}/>
        </Card>
      );
    }
    return (
      <Typography>Film indisponible</Typography>
    );
  }
}
Movie.url = '/movie/:id_movie';
export default Movie;
