import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import Waypoint from 'react-waypoint';

class Movies extends Component {
  constructor() {
    super();

    this.renderMovies = this.renderMovies.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
  }

  loadMoreItems() {
    const {
      page,
      getMoviePageHandle,
    } = this.props;
    getMoviePageHandle(page);
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
    const { movies } = this.props;
    if (!movies) {
      return (<div>No movies yet</div>);
    }
    return movies.map(movie => <Grid item><div>{movie}</div></Grid>);
  }

  render() {
    return (
      <div>
        <Grid container>
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
};

Movies.defaultProps = {
  movies: null,
};

const mapStateToProps = state => ({
  movies: state.movies,
  loading: state.movies.loading,
  page: state.moveis.currentPage,
});

const mapDispatchToProps = dispatch => ({
  getMoviePageHandle: page => dispatch(getMoviePageA(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
