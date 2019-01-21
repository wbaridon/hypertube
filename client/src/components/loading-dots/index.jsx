import React, { Component } from 'react';
import {
  Typography,
} from '@material-ui/core';

export default class LoadingDots extends Component {
  constructor() {
    super();
    this.state = {
      dots: '',
    };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(
      () => {
        const { dots } = this.state;
        this.setState({ dots: `${dots}.` });
      }, 100,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { dots } = this.state;
    return (
      <Typography>
        {dots}
      </Typography>
    );
  }
}
