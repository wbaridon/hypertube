import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Waypoint from 'react-waypoint';
import { getMoviePageA } from 'Actions';
import MovieCard from './movie-card';
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

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      searchString: '',
    };

    this.renderMovies = this.renderMovies.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
  }

  componentDidMount() {
    document.getElementById('searchBar').focus();
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
    console.log(page);
    const request = defaultRequestShape;
    request.filter.searchString = searchString;
    request.filter.from = page * 10;
    request.filter.to = (page + 1) * 10;

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
          bottomOffset="-350px"
          onEnter={this.loadMoreItems}
        />
      );
    }
    return (null);
  }

  renderMovies() {
    const { movies } = this.props;
    if (movies.length === 0) {
      return (<div>No movies yet</div>);
    }
    return movies.map(movie => <Grid item key={movie._id}><MovieCard {...movie} /></Grid>);
  }

  render() {
    const {
      searchString,
    } = this.state;
    return (
      <div>
        <SearchBar handleSearchStringChange={this.handleSearchStringChange} searchString={searchString} />
        <Grid style={{ marginTop: '70px' }} spacing={0} container justify="center">
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

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
