import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid,
} from '@material-ui/core';
import './growShrink';
import styled, { keyframes } from 'styled-components';

const growShrinkAnimation = keyframes`
0% {
  font-size: 24px;
  color: #fff
  transform: rotate(90)
}
25% {
  font-size: 32px;
  color: #ccc
}
50% {
  font-size: 48px;
  color: #fff;
}
75% {
  font-size: 32px;
  color: #ccc
}
100% {
  font-size: 24px;
  color: #fff;
}
`;

const growShrink = styled.p`
  animation: ${growShrinkAnimation} 2s linear infinite;
`;

function GrowShrink({
  movieName,
  classes,
}) {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item>
        <Typography component={growShrink}>
          {movieName}
        </Typography>
      </Grid>
    </Grid>
  );
}

GrowShrink.propTypes = {
  movieName: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default (GrowShrink);
