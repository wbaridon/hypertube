import React from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';

const styles = {
  textField: {
    width: '70px',
    height: '22px',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'space-between',
  },
};

function ValuePicker({
  minValue,
  maxValue,
  currentLowValue,
  currentHighValue,
  handleValueChange,
  classes,
}) {
  console.log(minValue, maxValue, currentLowValue, currentHighValue)
  return (
    <div className={classes.root}>
      <TextField
        multiline={false}
        className={classes.textField}
        variant="outlined"
        label={`${minValue}`}
        value={currentLowValue}
        onChange={e => handleValueChange('low', e.target.value)}
      />
      <TextField
        multiline={false}
        className={classes.textField}
        variant="outlined"
        label={`${maxValue}`}
        value={currentHighValue}
        onChange={e => handleValueChange('high', e.target.value)}
      />
    </div>
  );
}

ValuePicker.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  currentLowValue: PropTypes.node.isRequired,
  currentHighValue: PropTypes.node.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ValuePicker);
