import React from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';

const styles = {
  textField: {
    width: '70px',
    height: '24px',
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
};

function toggleLetterToNumber(numberOrLetter, toNumber = true) {
  const az = /^[a-z]$/;
  const AZ = /^[A-Z]$/;
  const zeroTen = /^[0-9]+$/;
  numberOrLetter = typeof numberOrLetter === 'string' ? numberOrLetter : numberOrLetter.toString();
  if (numberOrLetter.match(az) && toNumber) {
    return (numberOrLetter.charCodeAt() - 97).toString();
  }
  if (numberOrLetter.match(AZ) && toNumber) {
    return (numberOrLetter.charCodeAt() - 65).toString();
  }
  if (numberOrLetter.match(zeroTen) && !toNumber) {
    return String.fromCharCode(parseInt(numberOrLetter, 10) + 97);
  }
  return numberOrLetter;
}


function ValuePicker({
  minValue,
  maxValue,
  currentLowValue,
  currentHighValue,
  isFloat,
  isAlphabet,
  handleValueChange,
  classes,
}) {
  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        variant="outlined"
        label={`${isAlphabet ? toggleLetterToNumber(minValue, false) : minValue}`}
        value={currentLowValue}
        onChange={e => handleValueChange('low', isAlphabet ? toggleLetterToNumber(e.target.value, true) : e.target.value)}
      />
      <TextField
        className={classes.textField}
        variant="outlined"
        label={`${isAlphabet ? toggleLetterToNumber(maxValue, false) : maxValue}`}
        value={currentHighValue}
        onChange={e => handleValueChange('high', isAlphabet ? toggleLetterToNumber(e.target.value, true) : e.target.value)}
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
  isFloat: PropTypes.bool,
  isAlphabet: PropTypes.bool,
  classes: PropTypes.shape({}).isRequired,
};

ValuePicker.defaultProps = {
  isFloat: false,
  isAlphabet: false,
};

export default withStyles(styles)(ValuePicker);
