import React from 'react';
import PropTypes from 'prop-types';
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
    const { match } = this.props;
    axios.get(`https://tv-v2.api-fetch.website/movie/${match.params.id_movie}`)
      .then((res) => {
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
            {`title: ${item.title}`}
          </Typography>
          <Typography>
            {`Genres: ${item.genres}`}
          </Typography>
          <Typography>
            {`Synopsis: ${item.synopsis}`}
          </Typography>
          <img src={item.images.poster} alt="poster" />
        </Card>
      );
    }
    return (
      <Typography>Film indisponible</Typography>
    );
  }
}

Movie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id_movie: PropTypes.string.isRequired,
    }).isRequired,

  }).isRequired,
};

Movie.url = '/movie/:id_movie';
export default Movie;
