import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

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
    axios.get('https://tv-v2.api-fetch.website/movies/1?order=1&sort=last%20added')
      .then(res => {
        console.log(res.data);
        this.setState({
          items: res.data.slice(0, 50),
        });
      });
  }

  render() {
    const { items } = this.state;
    const itemList = items.length ? (
      items.map(item => {
        return (
          <div className="post card" key={item._id}>
            <div className="card-content">
              <span className="card-title">{item.title}</span>
              <Link to={"/movie/" + item.imdb_id} >
                <img src={item.images.poster} alt="" />
              </Link>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No items yet</div>
    );
    return (
      <div>
        <div className="container">
          <h4 className="center">Home</h4>
          <Grid container spacing={40}>
            {itemList}
          </Grid>
        </div>
      </div>
    );
    // const { classes } = this.props;
  }
}

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Home.url = '/';
export default withStyles(myStyles)(Home);
