import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import Waypoint from 'react-waypoint';
import { getMoviePageA } from 'Actions';
import MovieCard from './movie-card';
import ActiveMovieCard from './active-movie-card';
import SearchBar from './search-bar';


const defaultRequestShape = {
  filter: {
    from: 0,
    to: 5,
    searchString: '',
    sortBy: 'alphabetical',
    reverse: false,
  },
};
const myStyles = theme => ({
  poster: {
    height: 'auto',
    flexGrow: 1,
    maxWidth: '275px',
    [theme.breakpoints.down(800)]: {
      maxWidth: '200px',
    },
    [theme.breakpoints.down(500)]: {
      maxWidth: '150px',
    },
  },
});

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
      currentMovie: null,
    };

    this.renderMovies = this.renderMovies.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
  }

  componentDidMount() {
    document.getElementById('searchBar').focus();
  }

  onHoverMovie(movieId) {
    this.setState({ currentMovie: movieId });
    console.log(movieId);
  }

  loadMoreItems() {
    const {
      page,
      getMoviePageHandle,
      token,
    } = this.props;
    const {
      searchString,
    } = this.state;
    const request = defaultRequestShape;
    request.filter.searchString = searchString;
    request.filter.from = page * 12;
    request.filter.to = (page + 1) * 12;

    getMoviePageHandle(token, request);
  }

  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value });
  }

  renderWaypoint() {
    const { loading } = this.props;
    if (!loading) {
      return (
        <Waypoint
          onEnter={this.loadMoreItems}
        />
      );
    }
    return (null);
  }

  renderMovies() {
    const { movies, classes } = this.props;
    const { currentMovie } = this.state;
    if (movies.length === 0) {
      return (<div>No movies yet</div>);
    }
    return movies.map((movie) => {
      return (
        <Grid item onMouseOver={() => this.onHoverMovie(movie._id)}  className={classes.poster} key={movie._id}>
          {
            currentMovie === movie._id ? <ActiveMovieCard myPropClass={classes.poster} {...movie} />
              : <MovieCard myPropClass={classes.poster} {...movie} />
          }
        </Grid>);
    });
  }

  render() {
    const {
      searchString,
    } = this.state;
    return (
      <div>
        <SearchBar handleSearchStringChange={this.handleSearchStringChange} searchString={searchString} />
        <Grid container style={{ marginTop: '70px' }} spacing={0} justify="space-around">
          {this.renderMovies()}
        </Grid>
        {this.renderWaypoint()}
      </div>
    );
  }
}


Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({

  })),
  page: PropTypes.number.isRequired,
  getMoviePageHandle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
};

Movies.defaultProps = {
  movies: null,
};

Movies.url = '/movies';

const mapStateToProps = state => ({
  movies: state.movies.movies,
  loading: state.movies.loading,
  page: state.movies.currentPage,
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  getMoviePageHandle: (token, request) => dispatch(getMoviePageA(token, request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(myStyles)(Movies));
