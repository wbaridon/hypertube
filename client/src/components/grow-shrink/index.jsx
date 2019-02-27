import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid,
} from '@material-ui/core';
import styled, { keyframes } from 'styled-components';

const growShrinkAnimation = keyframes`
from {
  visibility:hidden;
  opacity: 0.1;
  font-size: 24px;
  margin-top: 0px;
  color: #fff
}
to {
  visibility: visible;
  opacity: 1;
  margin-top: 300px;
  font-size: 52px;
  color: #fff;
}
`;

const growShrink = styled.p`
  animation: ${growShrinkAnimation} 3s ease;
`;

function GrowShrink({
  movieName,
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
};

export default (GrowShrink);
