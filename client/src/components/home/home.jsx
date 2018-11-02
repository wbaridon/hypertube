import React from 'react';
import { Grid } from '@material-ui/core';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      fakestate: 283,
    };
  }

  render() {
    const { fakestate } = this.state;
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={11} sm={10} md={9} key={fakestate}>
          <div>{fakestate}</div>
        </Grid>
      </Grid>
    );
  }
}

Home.url = '/';
export default Home;
