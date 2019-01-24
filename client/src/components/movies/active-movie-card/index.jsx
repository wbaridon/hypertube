import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  withStyles,
  Grid,
  CardActions,
  Button,
} from '@material-ui/core';

const styles = {
  media: {
    height: 160,
  },
  textFlex: {
    flexGrow: 1,
  },
};

function ActiveMovieCard({
  title,
  year,
  cover,
  synopsis,
  myPropClass,
  classes,
  dimensions,
}) {
  return (
    <Card style={{ width: dimensions.width, height: dimensions.height }}>
      <CardContent style={{ padding: 3 }}>
        <Grid container direction="column" wrap="nowrap" style={{ height: dimensions.height }}>
          <Grid item>
            <Typography variant="body1">
              {title}
            </Typography>
          </Grid>
          <Grid item style={{ display: 'flex', flex: 1, minHeight: 0, minWidth: 0 }}>
            <Typography style={{ minHeight: 0, overflowY: 'auto' }} variant={dimensions.width === 400 ? 'h6' : 'caption'}>
              {synopsis}
            </Typography>
          </Grid>
          {/* <Grid item>
            <Grid container wrap="nowrap">
              <Grid item>
                <Button>
                  + to list
              </Button>
              </Grid>
              <Grid item>
                <Button>
                  watch now
              </Button>
              </Grid>
            </Grid> */}
          {/* </Grid> */}
          <Grid item>
            <CardActions>
              <Button>
                <Typography variant="caption">
                  + to list
                </Typography>
              </Button>
              <Button>
                <Typography variant="caption">
                  watch now
                </Typography>
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
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
  myPropClass: PropTypes.string.isRequired,
  // classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ActiveMovieCard);
