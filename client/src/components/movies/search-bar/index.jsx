import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Paper,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
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
  toggleMenu,
  sortSelection,
  reversedSort,
  toggleReverseSort,
}) {
  return (
    <Paper className={classes.searchBar}>
      <TextField
        autoComplete="off"
        InputProps={{
          startAdornment: <InputAdornment position="start">{sortSelection}</InputAdornment>,
          endAdornment:
            (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Reverse"
                  onClick={toggleReverseSort}
                >
                  {reversedSort ? <ArrowUpward /> : <ArrowDownward />}
                </IconButton>
              </InputAdornment>
            ),
        }
        }
        classes={{ focused: classes.searchBarFocused }}
        id="searchBar"
        tabIndex={-1}
        placeholder="Search for movie titles, directors, writers, etc..."
        variant="outlined"
        fullWidth
        value={searchString}
        onChange={handleSearchStringChange}

      />
    </Paper>
  );
}

SearchBar.propTypes = {
  searchString: PropTypes.string.isRequired,
  handleSearchStringChange: PropTypes.func.isRequired,
  sortSelection: PropTypes.string.isRequired,
  reversedSort: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  toggleReverseSort: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(SearchBar);
