import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  Button,
  Paper,
} from '@material-ui/core';

function ActiveMovieCard({
  title,
  year,
  cover,
  synopsis,
  dimensions,
}) {
  return (
    <Card style={{ zIndex: 1, position: 'relative', width: dimensions.width, height: dimensions.height, padding: 5 }}>
      <Paper
        style={{
          padding: '3px',
          position: 'absolute',
          top: '5px',
          right: '5px',
          boxShadow: '-3px 3px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Typography variant={dimensions.width <= 250 ? 'caption' : 'caption'}>
          {title}
        </Typography>
        <Typography variant={dimensions.width <= 250 ? 'caption' : 'caption'}>
          {`Released: ${year}`}
        </Typography>
      </Paper>
      <Grid container style={{ height: dimensions.height }} direction="column" wrap="nowrap">
        <Grid item>
          <CardMedia style={{ height: dimensions.width / 2 }} image={cover} />
        </Grid>

        <Grid
          item
          style={{
            display: 'flex',
            flex: 1,
            minHeight: 0,
            minWidth: 0,
          }}
        >
          <Typography style={{ minHeight: 0, overflowY: 'auto' }} variant={dimensions.width === 500 ? 'body1' : 'caption'}>
            {synopsis}
          </Typography>
        </Grid>
        <Grid item style={{ paddingBottom: 10 }}>
          <Grid container wrap="nowrap" alignContent="space-between" alignItems="center">
            <Grid item>
              <Button variant="text" size="small">
                + to list
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" size="small">
                watch now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

ActiveMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default ActiveMovieCard;
