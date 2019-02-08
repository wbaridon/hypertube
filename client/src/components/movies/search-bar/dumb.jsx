
import React from 'react';
import PropTypes from 'prop-types';

function DumbSearchBar({
  searchString,
  handleSearchStringChange,
  handleOpenMenu,
  handleCloseMenu,
  sortSelectionCriteria,
  reversedSort,
  handleToggleReverseSort,
  handleClearState,
  anchorEl,
  classes,
}) {
  return (
    <div>

    </div>
  );
}

DumbSearchBar.propTypes = {
  searchString: PropTypes.string.isRequired,
  handleSearchStringChange: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  sortSelectionCriteria: PropTypes.string.isRequired,
  reversedSort: PropTypes.bool.isRequired,
  handleToggleReverseSort: PropTypes.func.isRequired,
  handleClearState: PropTypes.func.isRequired,
  anchorEl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default DumbSearchBar;
