import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const myStyles = {
  root: {
    width: '52px',
  },
  poster: {
    maxWidth: 320,
  },
};


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    axios.get('https://tv-v2.api-fetch.website/movies/1')
      .then((res) => {
        this.setState({
          items: res.data.slice(0, 60),
        });
      });
  }

  render() {
    const { items } = this.state;
    const { classes } = this.props;
    const itemList = items.length ? (
      items.map((item) => {
        return (
          // eslint-disable-next-line no-underscore-dangle
          <Grid item key={item._id} className={classes.poster}>
            <Link to={`/movie/${item.imdb_id}`}>
              <img className={classes.poster} src={item.images.poster} alt="" />
            </Link>
          </Grid>
        );
      })
    ) : (
      <Typography>No items yet</Typography>
    );
    return (
      <Grid container direction="row" spacing={0} justify="space-around" alignItems="center" alignContent="center">
        {itemList}
      </Grid>
    );
    // const { classes } = this.props;
  }
}

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Home.url = '/';
export default withStyles(myStyles)(Home);
