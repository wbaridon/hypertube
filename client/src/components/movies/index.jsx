import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  withWidth,
  Fab,
  withStyles,
} from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
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


const styles = {
  fab: {
    position: 'fixed',
    bottom: '70px',
    right: '20px',
  },
};

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
      sortSelection: 'alphabetical',
      reversedSort: false,
      currentMovie: null,
      top: false,
      scrolling: false,
      menuOpen: false,
    };

    this.renderMovies = this.renderMovies.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.debounceSearchStringChange = debounce(this.debounceSearchStringChange, 300);
    this.handleTopSpan = this.handleTopSpan.bind(this);
    this.handleScrollToTop = this.handleScrollToTop.bind(this);
    this.debounceScrolling = debounce(() => this.setState({ scrolling: true }), 500, { leading: true, trailing: false }).bind(this);
  }

  componentDidMount() {
    document.getElementById('searchBar').focus();
    const options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(this.handleTopSpan, options);
    observer.observe(document.getElementById('top'));
    let timeout;
    window.addEventListener('scroll', () => {
      this.debounceScrolling();
      window.clearTimeout(timeout);
      timeout = setTimeout(() => this.setState({ scrolling: false }), 500);
    }, false);
  }

  onHoverMovie(movieId) {
    const { scrolling } = this.state;
    if (!scrolling) {
      this.setState({ currentMovie: movieId });
    }
  }

  handleTopSpan(entries) {
    this.setState({ top: entries[0].isIntersecting, scrolling: false });
  }

  handleScrollToTop() {
    document.getElementById('top').scrollIntoView();
    this.setState({ scrolling: true });
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
    request.filter.from = page * 50;
    request.filter.to = (page + 1) * 50;
    getMoviePageHandle(token, request);
  }

  debounceSearchStringChange() {
    const { clearMoviesHandle } = this.props;
    clearMoviesHandle();
    this.loadMoreItems();
  }

  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value }, () => {
      this.debounceSearchStringChange();
    });
  }

  toggleMenu() {
    this.setState({ menuOpen: true });
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
      sortSelection,
      reversedSort,
      top,
    } = this.state;
    const {
      classes,
    } = this.props;
    return (
      <div>
        {!top ? <Fab className={classes.fab} onClick={this.handleScrollToTop}><ArrowUpward /></Fab> : null}
        <SearchBar
          handleSearchStringChange={this.handleSearchStringChange}
          searchString={searchString}
          toggleMenu={this.handleMenuOpen}
          sortSelection={sortSelection}
          reversedSort={reversedSort}
        />
        <span id="top" style={{ position: 'absolute', top: '0px' }} />
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

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(withWidth()(Movies))));
