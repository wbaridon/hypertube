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
import ValuePicker from './value-picker';

const styles = theme => ({
  searchBar: {
    width: '90%',
    marginBottom: '25px',
    marginLeft: '5%',
    position: 'fixed',
    [theme.breakpoints.only('xs')]:
    {
      top: '40px',
    },
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
});

function SearchBar({
  searchString,
  handleSearchStringChange,
  valuePickerValues,
  classes,
  openMenu,
  sortSelection,
  reversedSort,
  toggleReverseSort,
  clearState,
  anchorEl,
  closeMenu,
  intl,
}) {
  return (
    <Paper className={classes.searchBar}>
      <TextField
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button onClick={e => openMenu(e)}>
                <br />
                <Typography variant="caption">{intl.formatMessage({ id: `searchbar.selected.${sortSelection}` })}</Typography>
              </Button>
              { sortSelection !== 'popular' && sortSelection !== 'alphabetical' ? <ValuePicker {...valuePickerValues} /> : null}
              <Menu
                ModalClasses={{ root: classes.root }}
                id="select-filter-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => closeMenu()}
              >
                <MenuItem onClick={() => closeMenu('popular')}>{intl.formatMessage({ id: 'searchbar.popular' })}</MenuItem>
                <MenuItem onClick={() => closeMenu('alphabetical')}>{intl.formatMessage({ id: 'searchbar.alphabetical' })}</MenuItem>
                <MenuItem onClick={() => closeMenu('date')}>{intl.formatMessage({ id: 'searchbar.date' })}</MenuItem>
                <MenuItem onClick={() => closeMenu('rating')}>{intl.formatMessage({ id: 'searchbar.rating' })}</MenuItem>
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
        placeholder="Search for movies..."
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
  openMenu: PropTypes.func.isRequired,
  toggleReverseSort: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  closeMenu: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}),
  intl: intlShape.isRequired,
  valuePickerValues: PropTypes.shape({
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    currentLowValue: PropTypes.node.isRequired,
    currentHighValue: PropTypes.node.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    isFloat: PropTypes.bool,
    isAlphabet: PropTypes.bool,
  }).isRequired,
};

SearchBar.defaultProps = {
  anchorEl: null,
};

export default injectIntl(withStyles(styles)(SearchBar));
