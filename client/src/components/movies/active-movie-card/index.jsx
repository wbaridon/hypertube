import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  Button,
  Paper,
  CardContent,
  Link,
} from '@material-ui/core';

class ActiveMovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      image: true,
    };

    this.setImageFalse = this.setImageFalse.bind(this);
  }

  setImageFalse() {
    // console.log('worked');
    this.setState({ image: false });
  }

  render() {
    const {
      imdbId,
      title,
      year,
      cover,
      synopsis,
      dimensions,
    } = this.props;
    const { image } = this.state;
    console.log(imdbId);
    if (image && cover) {
      return (
        <Card
          style={{
            position: 'relative',
            width: dimensions.width,
            height: dimensions.height,
            padding: 5,
          }}
        >

          {dimensions.width <= 175 && title.length > 16 ? null : (
            <Paper
              elevation={0}
              square
              style={{
                padding: '3px',
                position: 'absolute',
                top: '4px',
                right: '4px',
                boxShadow: '-3px 3px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Typography inline variant={dimensions.width <= 250 ? 'caption' : 'caption'}>
                {`${title} - ${year}`}
              </Typography>
            </Paper>
          )
          }
          <Grid container style={{ height: dimensions.height }} direction="column" wrap="nowrap">
            {
              dimensions.width <= 175 && title.length > 16
                ? (
                  <Grid item>
                    <Paper
                      elevation={0}
                      square
                      style={{
                        padding: '3px',
                      }}
                    >
                      <Typography inline variant={dimensions.width <= 250 ? 'caption' : 'caption'}>
                        {`${title} - ${year}`}
                      </Typography>
                    </Paper>
                  </Grid>
                )
                : (
                  <Grid item>
                    <CardMedia component="img" style={{ objectFit: 'cover', borderRadius: '5px', height: dimensions.width / 2 }} image={cover} onError={this.setImageFalse} />
                  </Grid>
                )
            }
            <Grid
              item
              style={{
                display: 'flex',
                flex: 1,
                minHeight: 0,
                minWidth: 0,
              }}
            >
              <Typography style={{ minHeight: 0, overflowY: 'auto' }}>
                {synopsis}
              </Typography>
            </Grid>
            <Grid item style={{ paddingBottom: 10 }}>
              <Grid container wrap="nowrap" alignContent="space-between" alignItems="center">
                <Grid item>
                  <Button>
                    <Typography variant="button" noWrap>
                      + to list
          </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button href={"/movie/"+imdbId}>
                    <Typography variant="button" noWrap>
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
    return (<Card style={{ height: dimensions.height, width: dimensions.width }}><CardContent><Typography variant="h5">{title}</Typography></CardContent></Card>);
  }
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
