import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import createTypography from '@material-ui/core/styles/createTypography';

const myStyles = {
  root: {
    width: '52px',
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
        console.log(res.data);
        this.setState({
          items: res.data.slice(0, 50),
        });
      });
  }

  render() {
    const { items } = this.state;
    const itemList = items.length ? (
      items.map((item) => {
        return (
          <Grid item key={item._id}>
            <Grid>
              <Link to={`/movie/${item.imdb_id}`}>
                <img src={item.images.poster} alt="" />
              </Link>
            </Grid>
          </Grid>
        );
      })
    ) : (
      <Typography>No items yet</Typography>
    );
    return (
      <Grid container direction="row" spacing={0} justify="space-around" alignItems="center">
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
