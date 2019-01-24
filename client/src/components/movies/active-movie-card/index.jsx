import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

function ActiveMovieCard({
  title,
  year,
  cover,
  synopsis,
  dimensions,
}) {
  return (
    <Card style={{ width: dimensions.width, height: dimensions.height, padding: 5 }}>
      <Grid container style={{ height: dimensions.height }} direction="column" wrap="nowrap">
        <Grid item>
          <CardMedia style={{ height: dimensions.width / 2 }} image={cover} />
        </Grid>
        <Grid item>
          <Typography variant={dimensions.width <= 150 ? 'caption' : 'title'}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant={dimensions.width <= 150 ? 'caption' : 'title'}>
            {`Released: ${year}`}
          </Typography>
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
        <Grid item>
          <Grid container wrap="nowrap">
            <Grid item>
              <Button>
                <Typography variant="caption">
                  + to list
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button>
                <Typography variant="caption">
                  watch now
                </Typography>
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
