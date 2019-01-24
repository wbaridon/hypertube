import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  searchBar: {
    width: '90%',
    marginBottom: '25px',
    marginLeft: '5%',
    position: 'fixed',
    top: '70px',
    zIndex: 1,
  },
};

function SearchBar({
  searchString,
  handleSearchStringChange,
  classes,
}) {
  return (
    <Paper className={classes.searchBar}>
      <TextField classes={{ focused: classes.searchBarFocused }} id="searchBar" tabIndex={-1} placeholder="Search for movie titles, directors, writers, etc..." variant="outlined" fullWidth value={searchString} onChange={handleSearchStringChange} />
    </Paper>
  );
}

SearchBar.propTypes = {
  searchString: PropTypes.string.isRequired,
  handleSearchStringChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SearchBar);
