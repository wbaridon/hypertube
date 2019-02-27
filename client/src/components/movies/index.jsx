import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  withWidth,
  Fab,
  withStyles,
  Typography,
} from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Waypoint from 'react-waypoint';
import debounce from 'lodash.debounce';
import { FormattedMessage } from 'react-intl';
import {
  getMoviePageA,
  clearMoviesA,
  addWatchListA,
  setMoviePageStateA,
  deleteWatchListA,
} from 'Actions';
import MovieCard from './movie-card';
import ActiveMovieCard from './active-movie-card';
import SearchBar from './search-bar';

const defaultRequestShape = {
  filter: {
    from: 0,
    to: 5,
    searchString: '',
    sortBy: 'popular',
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

function toggleLetterToNumber(numberOrLetter, toNumber = true) {
  const az = /^[a-z]$/;
  const AZ = /^[A-Z]$/;
  const zeroTen = /^[0-9]+$/;
  let myNumOrLetter = numberOrLetter;
  myNumOrLetter = typeof myNumOrLetter === 'string' ? myNumOrLetter : myNumOrLetter.toString();
  if (myNumOrLetter.match(az) && toNumber) {
    return (myNumOrLetter.charCodeAt() - 97).toString();
  }
  if (myNumOrLetter.match(AZ) && toNumber) {
    return (myNumOrLetter.charCodeAt() - 65).toString();
  }
  if (myNumOrLetter.match(zeroTen) && !toNumber) {
    return String.fromCharCode(parseInt(myNumOrLetter, 10) + 97);
  }
  return myNumOrLetter;
}

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.moviePageState,
      scrolling: false,
      scrollToTop: false,
      anchorEl: null,
    };
    this.state.valuePickerValues.handleValueChange = this.handleValueChangeDebounced.bind(this); // eslint-disable-line
    this.handleValueChange = debounce(this.handleValueChange, 800, { leading: false, trailing: true });
    this.renderMovies = this.renderMovies.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
    this.debounceSearchStringChange = debounce(this.debounceSearchStringChange, 300);
    this.onHoverMovie = this.onHoverMovie.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleScrollToTop = this.handleScrollToTop.bind(this);
    this.toggleReverseSort = this.toggleReverseSort.bind(this);
    this.clearState = this.clearState.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
    this.debounceScrolling = debounce(() => this.setState({ scrolling: true }), 500, { leading: true, trailing: false }).bind(this);
  }


  componentDidMount() {
    const { currentMovie } = this.state;
    document.getElementById('searchBar').focus();
    window.addEventListener('scroll', this.scrollListener, false);
    if (currentMovie !== null) {
      this.setState({ scrolling: true });
      this.waitForScroll = setTimeout(() => {
        document.getElementById('active-card').scrollIntoView({ block: 'center' });
      }, 100);
    }
    setTimeout(this.scrollListener, 200);
  }

  componentWillUnmount() {
    const { setMoviePageStateHandler } = this.props;
    window.removeEventListener('scroll', this.scrollListener);
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

  clearState() {
    this.setState({
      searchString: '',
      sortSelection: 'popular',
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

  scrollListener() {
    this.debounceScrolling();
    window.clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ scrolling: false }), 500);
  }


  handleScrollToTop() {
    document.getElementById('top').scrollIntoView();
    this.setState({ scrolling: true, scrollToTop: true });
  }

  loadMoreItems() {
    const {
      page,
      getMoviePageHandle,
      token,
    } = this.props;
    const {
      searchString,
      sortSelection,
      reversedSort,
      valuePickerValues,
    } = this.state;
    const request = defaultRequestShape;
    request.filter.searchString = searchString;
    request.filter.sortBy = sortSelection;
    request.filter.reverse = reversedSort;
    request.filter.from = page * 50;
    request.filter.to = (page + 1) * 50;
    request.filter.sortBySliderValues = {
      min: !valuePickerValues.isAlphabet ? parseFloat(valuePickerValues.currentLowValue) : valuePickerValues.currentLowValue,
      max: !valuePickerValues.isAlphabet ? parseFloat(valuePickerValues.currentHighValue) : valuePickerValues.currentHighValue,
    };
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

  handleValueChangeDebounced(whichOne, value) {
    const { valuePickerValues } = this.state;
    const { isAlphabet } = valuePickerValues;
    let {
      currentLowValue,
      currentHighValue,
    } = valuePickerValues;
    if (whichOne === 'low') {
      currentLowValue = value;
    } else {
      currentHighValue = value;
    }

    this.setState({
      valuePickerValues: {
        ...valuePickerValues,
        currentLowValue: isAlphabet ? toggleLetterToNumber(currentLowValue, false) : currentLowValue,
        currentHighValue: isAlphabet ? toggleLetterToNumber(currentHighValue, false) : currentHighValue,
      },
    }, () => {
      const newValuePickerValues = this.state.valuePickerValues; //eslint-disable-line
      let v;
      if (whichOne === 'low') {
        v = newValuePickerValues.currentLowValue;
      } else {
        v = newValuePickerValues.currentHighValue;
      }
      this.handleValueChange(whichOne, v);
    });
  }

  handleValueChange(whichOne, value) {
    const { valuePickerValues } = this.state;
    let {
      currentLowValue,
      currentHighValue,
    } = valuePickerValues;
    const {
      minValue,
      maxValue,
      isAlphabet,
      isFloat,
    } = valuePickerValues;
    let myValue = value;
    if (valuePickerValues.isAlphabet) {
      myValue = toggleLetterToNumber(myValue, true);
    }
    myValue = !isFloat ? parseInt(myValue, 10) : parseFloat(parseFloat(myValue).toFixed(1));
    if (Number.isNaN(myValue)) {
      myValue = whichOne === 'low' ? minValue : maxValue;
    }
    if (myValue > maxValue) {
      myValue = maxValue;
    } else if (myValue < minValue) {
      myValue = minValue;
    }
    currentLowValue = typeof currentLowValue === 'number' ? currentLowValue : toggleLetterToNumber(currentLowValue, true);
    currentHighValue = typeof currentHighValue === 'number' ? currentHighValue : toggleLetterToNumber(currentHighValue, true);
    if (whichOne === 'low') {
      if (myValue > currentHighValue) {
        currentLowValue = currentHighValue;
        currentHighValue = myValue;
      } else {
        currentLowValue = myValue;
      }
    }
    else if (whichOne === 'high') {
      if (myValue < currentLowValue) {
        currentHighValue = currentLowValue;
        currentLowValue = myValue;
      } else {
        currentHighValue = myValue;
      }
    }
    currentLowValue = typeof currentLowValue === 'string' ? currentLowValue : currentLowValue.toString();
    currentHighValue = typeof currentHighValue === 'string' ? currentHighValue : currentHighValue.toString();
    this.setState({
      valuePickerValues: {
        ...valuePickerValues,
        currentLowValue: isAlphabet ? (toggleLetterToNumber(currentLowValue, false)) : currentLowValue,
        currentHighValue: isAlphabet ? (toggleLetterToNumber(currentHighValue, false)) : currentHighValue,
      },
    }, () => {
      const { clearMoviesHandle } = this.props;
      clearMoviesHandle();
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

  handleMenuOpen(event) {
    this.setState({ anchorEl: event.target });
  }

  handleMenuClose(chosenValue = null) {
    if (chosenValue) {
      let { valuePickerValues } = this.state;
      if (chosenValue === 'rating') {
        valuePickerValues = {
          ...valuePickerValues,
          minValue: 0.0,
          maxValue: 10.0,
          currentLowValue: 0.0,
          currentHighValue: 10.0,
          isFloat: true,
          isAlphabet: false,
        };
      } else if (chosenValue === 'date') {
        valuePickerValues = {
          ...valuePickerValues,
          minValue: 1970,
          maxValue: 2019,
          currentLowValue: 1970,
          currentHighValue: 2019,
          isFloat: false,
          isAlphabet: false,
        };
      }
      const { clearMoviesHandle } = this.props;
      this.setState({ sortSelection: chosenValue, valuePickerValues },
        () => {
          clearMoviesHandle();
        });
    }
    this.setState({ anchorEl: null });
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
    const {
      movies,
      width,
      mobile,
      addWatchList,
      deleteWatchList,
      token,
    } = this.props;
    const { currentMovie } = this.state;
    const dimensions = getMaxImageWidth(width);
    const smallScreenDimensions = {};
    if (width === 'xs') {
      smallScreenDimensions.width = dimensions.width * 2;
      smallScreenDimensions.height = dimensions.height * 1.3;
    }
    if (movies.length === 0) {
      return (<Typography><FormattedMessage id="movies.noMoviesYet" /></Typography>);
    }
    return movies.map((movie) => {
      return (
        <Grid
          item
          style={{ height: width === 'xs' && mobile && currentMovie === movie._id ? 300 : dimensions.height, width: width === 'xs' && mobile && currentMovie === movie._id ? smallScreenDimensions.width : dimensions.width }}
          onBlur={mobile ? null : () => { this.onHoverMovie(null); }}
          onClick={mobile ? (e) => { this.onHoverMovie(movie._id, true, true, e); } : null}
          onMouseLeave={!mobile ? () => { this.onHoverMovie(null); } : null}
          onMouseEnter={!mobile ? () => { this.onHoverMovie(movie._id); } : null}
          onMouseOver={!mobile ? () => { this.onHoverMovie(movie._id); } : null}
          onFocus={!mobile ? () => { this.onHoverMovie(movie._id); } : null}
          key={movie._id}
        >
          {
            currentMovie === movie._id ? <ActiveMovieCard closeMovie={mobile ? () => this.onHoverMovie(null) : null} dimensions={width === 'xs' && mobile ? smallScreenDimensions : dimensions} addWatchList={addWatchList} deleteWatchList={deleteWatchList} token={token} movie={movie} {...movie} />
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
      anchorEl,
      valuePickerValues,
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
          openMenu={this.handleMenuOpen}
          closeMenu={this.handleMenuClose}
          sortSelection={sortSelection}
          reversedSort={reversedSort}
          toggleReverseSort={this.toggleReverseSort}
          clearState={this.clearState}
          anchorEl={anchorEl}
          valuePickerValues={valuePickerValues}
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
  movies: PropTypes.arrayOf(PropTypes.shape({})),
  page: PropTypes.number.isRequired,
  getMoviePageHandle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  mobile: PropTypes.oneOfType([
    PropTypes.bool.isRequired,
    PropTypes.string.isRequired,
  ]).isRequired,
  addWatchList: PropTypes.func.isRequired,
  deleteWatchList: PropTypes.func.isRequired,
  moviePageState: PropTypes.shape({
    searchString: PropTypes.string.isRequired,
    sortSelection: PropTypes.string.isRequired,
    valuePickerValues: PropTypes.shape({
      minValue: PropTypes.number.isRequired,
      maxValue: PropTypes.number.isRequired,
      currentLowValue: PropTypes.string.isRequired,
      currentHighValue: PropTypes.string.isRequired,
      isFloat: PropTypes.bool.isRequired,
      isAlphabet: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  clearMoviesHandle: PropTypes.func.isRequired,
  setMoviePageStateHandler: PropTypes.func.isRequired,
  noMoreMovies: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
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
  addWatchList: (token, idMovie) => dispatch(addWatchListA(token, idMovie)),
  deleteWatchList: (token, idMovie) => dispatch(deleteWatchListA(token, idMovie)),
  setMoviePageStateHandler: state => dispatch(setMoviePageStateA(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(withWidth()(Movies))));
