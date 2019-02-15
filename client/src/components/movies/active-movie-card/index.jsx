import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  Button,
  Paper,
  CardContent,
  Chip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class ActiveMovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      image: true,
      style: {
        opacity: 0.5,
        transition: 'all 0.5s ease-in'
      }
    };

    this.setImageFalse = this.setImageFalse.bind(this);
    this.mountStyle = this.mountStyle.bind(this);
  }

  componentDidMount() {
    this.animation = setTimeout(this.mountStyle, 10) // call the into animation
  }

  componentWillUnmount() {
    clearTimeout(this.animation);
  }

  setImageFalse() {
    // console.log('worked');
    this.setState({ image: false });
  }

  mountStyle() {
    this.setState({
      style: {
        opacity: 1,
        transition: 'all 0.5s ease-out',
      },
    });
  }
  handleAddWatchList(token, imdbId, bool) {
    let { movie } = this.props;
    const { addWatchList, deleteWatchList } = this.props;
    movie.watchList = bool;
    this.setState({ movie });
    bool == 'true' ? addWatchList(token, imdbId) : deleteWatchList(token, imdbId);
    // console.log(movie);
  }

  render() {
    const {
      token,
      imdbId,
      title,
      year,
      cover,
      synopsis,
      dimensions,
      closeMovie,
      imdbRating,
      movie,
    } = this.props;
    const { image } = this.state;
    const { style } = this.state;
    if (image && cover) {
      return (
        <Card
          style={{
            ...style,
            position: 'relative',
            width: dimensions.width,
            height: dimensions.height,
            padding: 5,
          }}
          id="active-card"
        >

          {dimensions.width <= 175 && title.length > 16 ? null : (
            <Paper
              elevation={0}
              square
              style={{
                padding: '3px',
                position: 'absolute',
                top: '4px',
                right: '4px',
                boxShadow: '-3px 3px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Typography inline variant={dimensions.width <= 250 ? 'caption' : 'caption'}>
                {`${title} - ${year}`}
              </Typography>
            </Paper>
          )
          }
          <Grid onClick={closeMovie} container style={{ height: dimensions.height }} direction="column" wrap="nowrap">
            {
              dimensions.width <= 175 && title.length > 16
                ? (
                  <Grid item>
                    <Paper
                      elevation={0}
                      square
                      style={{
                        padding: '3px',
                      }}
                    >
                      <Typography inline variant={dimensions.width <= 250 ? 'caption' : 'caption'}>
                        {`${title} - ${year}`}
                      </Typography>
                    </Paper>
                  </Grid>
                )
                : (
                  <Grid item>
                    <CardMedia component="img" style={{ objectFit: 'cover', borderRadius: '5px', height: dimensions.width / 2 }} image={cover} onError={this.setImageFalse} />
                  </Grid>
                )
            }
            <Grid
              item
              style={{
                display: 'flex',
                flex: 1,
                minHeight: 0,
                minWidth: 0,
              }}
            >
              <Typography style={{ minHeight: 0, overflowY: 'hidden' }}>
                {synopsis}
              </Typography>
            </Grid>
            {imdbRating ? <Grid item><Chip label={`Rating: ${imdbRating}`} /></Grid> : null}
            <Grid item style={{ paddingBottom: 10 }}>
              <Grid container wrap="nowrap" alignContent="space-between" alignItems="center">
                <Grid item>
                  <Button>
                    {movie.watchList === 'false' ? (
                      <Typography variant="button" noWrap onClick={() => { this.handleAddWatchList(token, imdbId, 'true'); }}>
                        <FormattedMessage id="movies.addList" />
                      </Typography>
                    ) : (
                      <Typography variant="button" noWrap onClick={() => { this.handleAddWatchList(token, imdbId, 'false'); }}>
                        <FormattedMessage id="movie.deleteList" />
                      </Typography>
                    )}
                  </Button>
                </Grid>
                <Grid item>
                  <Button component={Link} to={{ pathname: `/movie/${imdbId}`, state: { movieName: title } }} style={{ width: '100%' }}>
                    <Typography variant="button" noWrap style={{ width: '100%' }}>
                      <FormattedMessage id="movies.watch" />
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      );
    }
    return (<Card style={{ height: dimensions.height, width: dimensions.width }}><CardContent><Typography variant="h5">{title}</Typography></CardContent></Card>);
  }
}
ActiveMovieCard.propTypes = {
  token: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.node,
  cover: PropTypes.string.isRequired,
  synopsis: PropTypes.node,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  closeMovie: PropTypes.func,
  imdbRating: PropTypes.number,
  addWatchList: PropTypes.func.isRequired,
  deleteWatchList: PropTypes.func.isRequired,
  movie: PropTypes.shape({}).isRequired,
};

ActiveMovieCard.defaultProps = {
  closeMovie: () => { },
  year: 1914,
  imdbRating: 0,
  synopsis: 'No summary available',
};

export default ActiveMovieCard;
