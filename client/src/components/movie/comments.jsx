import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Avatar,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Button,
  OutlinedInput,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { newCommentA } from 'Actions';
// import { handleSubmit } from '../register/event-handlers';

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      newComment: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      newComment,
    } = this.state;
    const {
      handleNewComment,
      userName,      
    } = this.props;
    const d = new Date();
    const n = d.getTime();
    console.log(n);
    console.log(userName);
    console.log(newComment);
    handleNewComment(userName, newComment, n);
  }

  handleFieldChange(value) {
    this.setState({ newComment: value });
  }

  render() {
    const { comments } = this.props;
    console.log(comments);
    return (
      <div style={{ marginTop: '40px' }}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6"><FormattedMessage id="movie.comments" /></Typography>
          {comments.length !== 0 ? comments.map(comment => (
            <Paper key={comment.timestamp}>
              <Grid container wrap="nowrap" spacing={16}>
                <Grid item>
                  <Avatar>W</Avatar>
                </Grid>
                <Grid item>
                  <Typography>
                    {comment.username}
                    <FormattedMessage id="movie.wrote" />
                  </Typography>
                  <Typography>
                    {comment.comment}
                  </Typography>
                  <Typography>
                    <FormattedMessage id="movie.at" />
                    {comment.timestamp}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))
            : (
              <Typography variant="subtitle1"><FormattedMessage id="movie.noComments" /></Typography>
            )
          }
          <Paper>
            <form onSubmit={e => this.handleSubmit(e)}>
              <FormControl variant="outlined">
                <InputLabel>
                  <FormattedMessage id="movie.commentInput" />
                </InputLabel>
                <OutlinedInput
                  onChange={e => this.handleFieldChange(e.target.value)}
                  name="newcomment"
                  type="string"
                  id="component-outlined"
                  labelWidth={600}
                  style={{ margin: '10px' }}
                />
                <Button fullWidth type="submit">
                  Submit
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Paper>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  userName: PropTypes.string.isRequired,
  handleNewComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleNewComment: (userName, newComment, timeStamp) => dispatch(newCommentA(userName, newComment, timeStamp)),
});

const mapStateToProps = state => ({
  userName : state.user.data.userName,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
