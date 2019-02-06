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
  setMoviePageStateA,
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
    zIndex: 100,
    position: 'fixed',
    bottom: '70px',
    right: '20px',
  },
};

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = props.moviePageState;

    this.renderMovies = this.renderMovies.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.debounceSearchStringChange = debounce(this.debounceSearchStringChange, 300);
    this.onHoverMovie = this.onHoverMovie.bind(this);
    this.handleTopSpan = this.handleTopSpan.bind(this);
    this.handleScrollToTop = this.handleScrollToTop.bind(this);
    this.debounceScrolling = debounce(() => this.setState({ scrolling: true }), 500, { leading: true, trailing: false }).bind(this);
    this.scrollListener = this.scrollListener.bind(this);
    this.toggleReverseSort = this.toggleReverseSort.bind(this);
    this.clearState = this.clearState.bind(this);
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
    window.addEventListener('scroll', this.scrollListener, false);
  }

  componentWillUnmount() {
    const { setMoviePageStateHandler } = this.props;
    window.removeEventListener('scroll', this.scrollListener);
    window.clearTimeout(this.timeout);
    setMoviePageStateHandler(this.state);
  }

  onHoverMovie(movieId, toggle, scrollTo, event) {
    const { scrolling, currentMovie } = this.state;
    if (!scrolling) {
      if (toggle && currentMovie === movieId) {
        this.setState({ currentMovie: null });
        event.target.scrollIntoView({ block: 'center' });
      } else {
        this.setState({ currentMovie: movieId });
        if (scrollTo) {
          setTimeout(() => document.getElementById('active-card').scrollIntoView({ block: 'center' }), 50);
        }
      }
    }
  }

  scrollListener() {
    this.debounceScrolling();
    window.clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ scrolling: false }), 500);
  }

  clearState() {
    this.setState({
      searchString: '',
      sortSelection: 'alphabetical',
      reversedSort: false,
      currentMovie: null,
      top: false,
      scrolling: false,
      menuOpen: false,
    }, () => {
      const { clearMoviesHandle } = this.props;
      clearMoviesHandle();
    });
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
      reversedSort,
    } = this.state;
    const request = defaultRequestShape;
    request.filter.searchString = searchString;
    request.filter.reverse = reversedSort;
    request.filter.from = page * 50;
    request.filter.to = (page + 1) * 50;
    console.log(request);
    getMoviePageHandle(token, request);
  }

  debounceSearchStringChange() {
    const { clearMoviesHandle } = this.props;
    clearMoviesHandle();
  }

  handleSearchStringChange(event) {
    this.setState({ searchString: event.target.value }, () => {
      this.debounceSearchStringChange();
    });
  }

  toggleReverseSort() {
    const { reversedSort } = this.state;
    const { clearMoviesHandle } = this.props;
    this.setState({ reversedSort: !reversedSort },
      () => {
        clearMoviesHandle();
      });
  }


  renderWaypoint() {
    const { loading, noMoreMovies, page } = this.props;
    if (!loading && !noMoreMovies) {
      return (
        <Waypoint
          onEnter={this.loadMoreItems}
          key={page}
        />
      );
    }
    return (null);
  }

  renderMovies() {
    const { movies, width, mobile } = this.props;
    const { currentMovie } = this.state;
    const dimensions = getMaxImageWidth(width);
    const smallScreenDimensions = {};
    if (width === 'xs') {
      smallScreenDimensions.width = dimensions.width * 2;
      smallScreenDimensions.height = dimensions.height * 2;
    }
    if (movies.length === 0) {
      return (<div>No movies yet</div>);
    }
    return movies.map((movie) => {
      return (
        <Grid
          item
          style={{ height: width === 'xs' && mobile && currentMovie === movie._id ? smallScreenDimensions.height : dimensions.height, width: width === 'xs' && mobile && currentMovie === movie._id ? smallScreenDimensions.width : dimensions.width }}
          onBlur={mobile ? null : (e) => { e.preventDefault(); this.onHoverMovie(null); console.log('onblur'); }}
          onClick={mobile ? (e) => { e.preventDefault(); this.onHoverMovie(movie._id, true, true, e); console.log('onCLick'); } : null}
          onMouseLeave={!mobile ? (e) => { e.preventDefault(); this.onHoverMovie(null); console.log('onMouseleave'); } : null}
          onMouseEnter={!mobile ? (e) => { e.preventDefault(); this.onHoverMovie(movie._id); console.log('onMouseEnter'); } : null}
          onMouseOver={!mobile ? (e) => { e.preventDefault(); this.onHoverMovie(movie._id); console.log('onMouseover'); } : null}
          onFocus={!mobile ? (e) => { e.preventDefault(); this.onHoverMovie(movie._id); console.log('onFocus'); } : null}
          key={movie._id}
        >
          {
            currentMovie === movie._id ? <ActiveMovieCard closeMovie={mobile ? () => this.onHoverMovie(null) : null} dimensions={width === 'xs' && mobile ? smallScreenDimensions : dimensions} {...movie} />
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
          // toggleMenu={this.handleMenuOpen}
          sortSelection={sortSelection}
          reversedSort={reversedSort}
          toggleReverseSort={this.toggleReverseSort}
          clearState={this.clearState}
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
  mobile: PropTypes.bool.isRequired,
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
  mobile: state.user.isMobile,
  moviePageState: state.movies.moviePageState,
});

const mapDispatchToProps = dispatch => ({
  getMoviePageHandle: (token, request) => dispatch(getMoviePageA(token, request)),
  clearMoviesHandle: () => dispatch(clearMoviesA()),
  setMoviePageStateHandler: state => dispatch(setMoviePageStateA(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(withWidth()(Movies))));
