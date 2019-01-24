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

class ActiveMovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageHeight: 0,
    };

    this.getImageHeight = this.getImageHeight.bind(this);
  }


  getImageHeight() {
    const imageHeight = this.imageRef.clientHeight;
    this.setState({ imageHeight });
  }

  render() {
    const {
      title,
      year,
      cover,
      synopsis,
      myPropClass,
      classes,
    } = this.props;
    const {
      imageHeight,
    } = this.state;
    return (
      <Card style={{ height: imageHeight }} className={`${myPropClass}`}>
        {imageHeight === 0 ? <img className={myPropClass} onLoad={this.getImageHeight} ref={ref => this.imageRef = ref} src={cover} alt={title} /> : null}
        <Grid container style={{ maxHeight: imageHeight }} direction="column" wrap="nowrap">
          <Grid item>
            <Typography variant="h6">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" style={{ overflowY: 'auto' }}>
              {synopsis}
            </Typography>
          </Grid>
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
        </Grid>
      </Card>
    );
  }
}
ActiveMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  myPropClass: PropTypes.string.isRequired,
  // classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ActiveMovieCard);
