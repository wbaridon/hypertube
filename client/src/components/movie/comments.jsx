import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Avatar,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  Button,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { newCommentA, deleteCommentA } from 'Actions';
import Close from '@material-ui/icons/Close';
// import { handleSubmit } from '../register/event-handlers';

class Comments extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
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
      token,
      idMovie,
    } = this.props;
    const test = this.myRef;
    console.log(token);
    console.log(test);
    this.setState({ newComment: '' });
    handleNewComment(token, newComment, idMovie);
  }

  handleFieldChange(value) {
    this.setState({ newComment: value });
  }

  handleDelete(e) {
    const {
      handleDeleteComment,
    } = this.props;
    console.log(e);
    handleDeleteComment('test');
  }

  render() {
    const { comments } = this.props;
    const { newComment } = this.state;
    console.log(comments);
    return (
      <div style={{ minWidth: '90%', margin: 'auto', marginTop: '40px' }}>
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
                  <IconButton onClick={e => this.handleDelete(e)}>
                    <Close />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))
            : (
              <Typography variant="subtitle1" style={{ margin: '20px' }}><FormattedMessage id="movie.noComments" /></Typography>
            )
          }
          <Paper>
            <form onSubmit={e => this.handleSubmit(e)} style={{ textAlign: 'center' }}>
              <FormControl variant="outlined">
                <InputLabel style={{ marginTop: '20px' }}>
                  <FormattedMessage id="movie.commentInput" />
                </InputLabel>
                <OutlinedInput
                  value={newComment}
                  ref={this.myRef}
                  onChange={e => this.handleFieldChange(e.target.value)}
                  name="newcomment"
                  type="string"
                  id="component-outlined"
                  labelWidth={400}
                  style={{ margin: '10px' }}
                />
                <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginBottom: '20px' }}>
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
  idMovie: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  token: PropTypes.string.isRequired,
  handleNewComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleNewComment: (token, newComment, idMovie) => dispatch(newCommentA(token, newComment, idMovie)),
  handleDeleteComment: idComment => dispatch(deleteCommentA(idComment)),

});

const mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
