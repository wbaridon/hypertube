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

function formatDate(n) {
  let m = new Date(n).getMinutes().toString();
  let h = new Date(n).getHours().toString();
  if (h < 10) {
    h = `0${h}`;
  }
  if (m < 10) {
    (m = `0${m}`);
  }
  return (`${h}:${m}`);
}


class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      newComment: '',
      page: 1,
    };
    // this.debounceScrolling = debounce(() => this.setState({ scrolling: true }), 500, { leading: true, trailing: false }).bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener() {
    const { page } = this.state;
    const scrollmax = document.getElementsByTagName('html')[0].scrollHeight;
    const scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
    if (scrollPos > scrollmax - screen.height) { //eslint-disable-line
      this.setState({ page: page + 1 });
    }
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

  render() {
    const {
      comments,
      actualComments,
      userName,
    } = this.props;
    const {
      newComment,
      page,
    } = this.state;
    let displayedComments = actualComments;
    if (!displayedComments) {
      displayedComments = comments;
    }
    displayedComments.sort((a, b) => {
      if (a.postedOn > b.postedOn) {
        return -1;
      }
      if (a.postedOn < b.postedOn) {
        return 1;
      }
      return 0;
    });
    displayedComments = displayedComments.slice(0, page * 5);
    return (
      <div style={{ minWidth: '90%', margin: 'auto', marginTop: '40px' }}>
        <span id="top" style={{ position: 'absolute', top: '0px' }} />
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}><FormattedMessage id="movie.comments" /></Typography>
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
                  labelWidth={200}
                  style={{ margin: '10px' }}
                />
                <Button variant="contained" color="primary" fullWidth type="submit" style={{ marginBottom: '20px' }}>
                  <FormattedMessage id="movie.submit" />
                </Button>
              </FormControl>
            </form>
          </Paper>
          {displayedComments.length !== 0 ? displayedComments.map(comment => (
            <Paper key={comment._id} style={{ padding: '10px', marginBottom: '10px' }}>
              <Grid container wrap="nowrap" spacing={16}>
                <Grid item>
                  <Avatar alt="profilpic" src={comment.picture} />
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  <Typography variant="subtitle1">
                    {comment.userName}
                    <FormattedMessage id="movie.the" />
                    {new Date(comment.postedOn).toLocaleDateString('fr-FR')}
                    <FormattedMessage id="movie.at" />
                    {formatDate(comment.postedOn).toString()}
                  </Typography>
                  <br />
                  <Typography variant="subtitle2">
                    {comment.comment}
                  </Typography>
                  <br />
                </Grid>
                {
                  comment.userName === userName ? (
                    <IconButton style={{ margin: '10px' }} onClick={() => this.handleDelete(comment._id, comment.comment)}>
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
        </Paper>
      </div>
    );
  }
}

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

Comments.propTypes = {
  idMovie: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  token: PropTypes.string.isRequired,
  handleNewComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  actualComments: PropTypes.arrayOf(PropTypes.shape({})),
};

Comments.defaultProps = {
  actualComments: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
