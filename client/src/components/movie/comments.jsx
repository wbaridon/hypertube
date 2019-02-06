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
    if (newComment.length > 1) {
      handleNewComment(token, newComment, idMovie);
      this.setState({ newComment: '' });
    }
  }

  handleFieldChange(value) {
    this.setState({ newComment: value });
  }

  handleDelete(idComment, comment) {
    const {
      handleDeleteComment,
      token,
      idMovie,
    } = this.props;
    handleDeleteComment(idMovie, idComment, comment, token);
  }

  formatDate(n) {
    var m = new Date(n).getMinutes().toString();
    var h = new Date(n).getHours().toString();
    h < 10 ? (h = '0' + h) : (null);
    m < 10 ? (m = '0' + m) : (null);
    return (h + ':' + m) 
  }

  render() {
    const { comments, actualComments, userName } = this.props;
    const { newComment } = this.state;
    let displayedComments;
    actualComments ? (
      displayedComments = actualComments
    ) : (
      console.log("comments"),
      displayedComments = comments
    );
    console.log(displayedComments);
    return (
      <div style={{ minWidth: '90%', margin: 'auto', marginTop: '40px' }}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}><FormattedMessage id="movie.comments" /></Typography>
          {displayedComments.length !== 0 ? displayedComments.map(comment => (
            <Paper key={comment._id} style={{ padding: '10px' }}>
              <Grid container wrap="nowrap" spacing={16}>
                <Grid item>
                  <Avatar alt="profilpic" src={comment.picture} />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <Typography variant="subtitle1">
                    {comment.userName}
                    <FormattedMessage id="movie.the" />
                    { new Date(comment.postedOn).toLocaleDateString('fr-FR') }
                    <FormattedMessage id="movie.at" />
                    { this.formatDate(comment.postedOn).toString() }
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {comment.comment}
                  </Typography>
                  <br />
                </Grid>
                {
                  comment.userName === userName ? (
                    <IconButton style={{ margin: '10px' }} onClick={e => this.handleDelete(comment._id, comment.comment)}>
                      <Close />
                    </IconButton>
                  ) : (null)
                }
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
  userName: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleNewComment: (token, newComment, idMovie) => dispatch(newCommentA(token, newComment, idMovie)),
  handleDeleteComment: (idMovie, idComment, comment, token) => dispatch(deleteCommentA(idMovie, idComment, comment, token)),
});

const mapStateToProps = state => ({
  token: state.user.token,
  userName: state.user.data.userName,
  success: state.comment.success,
  actualComments: state.comment.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
