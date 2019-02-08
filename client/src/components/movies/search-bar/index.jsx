import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Clear from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl, intlShape } from 'react-intl';

const styles = {
  searchBar: {
    width: '90%',
    marginBottom: '25px',
    marginLeft: '5%',
    position: 'fixed',
    top: '70px',
    zIndex: 1,
  },
  smallButton: {
    width: '16px',
    height: '24px',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  root: {
    paddingRight: '0px !important',
  },
};

class SearchBar extends React.Component {
  render() {
    const {
      searchString,
      handleSearchStringChange,
      classes,
      openMenu,
      sortSelection,
      reversedSort,
      toggleReverseSort,
      clearState,
      anchorEl,
      closeMenu,
      intl,
    } = this.props;
    return (
      <Paper className={classes.searchBar}>
        <TextField
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Button onClick={e => openMenu(e)}>
                  <Typography noWrap>
                    {intl.formatMessage({ id: 'searchBar.sortBy' })}
                  </Typography>
                </Button>
                <Menu
                  ModalClasses={{ root: classes.root }}
                  id="select-filter-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => closeMenu()}
                >
                  <MenuItem onClick={() => closeMenu('alphabetical')}>Alphabetical</MenuItem>
                  <MenuItem onClick={() => closeMenu('date')}>Date</MenuItem>
                  <MenuItem onClick={() => closeMenu('rating')}>Rating</MenuItem>
                </Menu>
              </InputAdornment>
            ),
            endAdornment:
              (
                <InputAdornment position="end">
                  <IconButton
                    className={classes.smallButton}
                    aria-label="Reverse"
                    onClick={toggleReverseSort}
                  >
                    {reversedSort ? <ArrowUpward /> : <ArrowDownward />}
                  </IconButton>
                  <IconButton
                    className={classes.smallButton}
                    aria-label="Reverse"
                    onClick={clearState}
                  >
                    <Clear />
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
}
SearchBar.propTypes = {
  searchString: PropTypes.string.isRequired,
  handleSearchStringChange: PropTypes.func.isRequired,
  sortSelection: PropTypes.string.isRequired,
  reversedSort: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  toggleReverseSort: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  closeMenu: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(withStyles(styles)(SearchBar));
