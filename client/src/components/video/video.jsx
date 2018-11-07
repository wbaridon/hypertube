import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {

};

class Video extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>je te laisse me demander si tu as des questions</div>
      // <video id='myVideo' src="blob:null/edf9ee49-30da-4ba7-ac98-a596c1c7f8a8" width="1280px" height="720px" controls="">
      //   {/* <source /> */}
      // </video>
    );
  }
}

Video.propTypes = {

};

Video.url = '/video';
export default withStyles(styles)(Video);
