import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, withWidth } from '@material-ui/core';
import Waypoint from 'react-waypoint';
import debounce from 'lodash.debounce';
import {
  getMoviePageA,
  clearMoviesA,
} from 'Actions';
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

const getMaxImageWidth = (width) => {
  if (width === 'xs') {
    return {
      width: 150,
      height: 225,
    };
  }
  if (width === 'sm') {
    return {
      width: 175,
      height: 262.5,
    };
  }
  if (width === 'md') {
    return {
      width: 200,
      height: 300,
    };
  }
  if (width === 'lg') {
    return {
      width: 250,
      height: 375,
    };
  }
  return {
    width: 325,
    height: 487.5,
  };
};

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
    this.debounceSearchStringChange = debounce(this.debounceSearchStringChange, 300);
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
    request.filter.from = page * 10;
    request.filter.to = (page + 1) * 10;
    getMoviePageHandle(token, request);
  }

  debounceSearchStringChange() {
    const { clearMoviesHandle } = this.props;
    console.log(this.state);
    clearMoviesHandle();
    this.loadMoreItems();
  }

  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value }, () => {
      this.debounceSearchStringChange();
    });
  }

  renderWaypoint() {
    const { loading, noMoreMovies } = this.props;
    if (!loading && !noMoreMovies) {
      return (
        <Waypoint
          onEnter={this.loadMoreItems}
        />
      );
    }
    return (null);
  }

  renderMovies() {
    const { movies, width } = this.props;
    const { currentMovie } = this.state;
    const dimensions = getMaxImageWidth(width);
    if (movies.length === 0) {
      return (<div>No movies yet</div>);
    }
    return movies.map((movie) => {
      return (
        <Grid
          item
          style={{ height: dimensions.height, width: dimensions.width }}
          onBlur={() => this.onHoverMovie(null)}
          onMouseLeave={() => this.onHoverMovie(null)}
          onMouseEnter={() => this.onHoverMovie(movie._id)}
          onMouseOver={() => this.onHoverMovie(movie._id)}
          onFocus={() => this.onHoverMovie(movie._id)}
          key={movie._id}
        >
          {
            currentMovie === movie._id ? <ActiveMovieCard dimensions={dimensions} {...movie} />
              : <MovieCard dimensions={dimensions} {...movie} />
          }
        </Grid>
      );
    });
  }

  render() {
    const {
      searchString,
    } = this.state;
    return (
      <div>
        <SearchBar handleSearchStringChange={this.handleSearchStringChange} searchString={searchString} />
        <Grid container style={{ marginTop: '70px' }} spacing={0} justify="center">
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
  noMoreMovies: state.movies.noMoreMovies,
  token: state.user.token,
});

const mapDispatchToProps = dispatch => ({
  getMoviePageHandle: (token, request) => dispatch(getMoviePageA(token, request)),
  clearMoviesHandle: () => dispatch(clearMoviesA()),
});

export default connect(mapStateToProps, mapDispatchToProps)((withWidth()(Movies)));
