import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Avatar,
  Paper,
  Typography,
  form,
  FormControl,
  Input,
  InputLabel,
  Button,
  OutlinedInput,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class Comments extends React.Component {
  componentWillMount() {
  }

  render() {
    const {
      comments,
    } = this.props;
    console.log(comments)
    return (
      <div style={{marginTop: '40px'}}>
        <Paper style={{padding:"20px"}}>
          <Typography variant='h6'>Commentaires:</Typography>
          {comments.length !== 0 ? comments.map(comment => (
            <Paper key={comment.timestamp}>
              <Grid container wrap='nowrap' spacing={16}>
                <Grid item>
                  <Avatar>W</Avatar>
                </Grid>
                <Grid item>
                <Typography>{comment.username} à écrit:</Typography> 
                <Typography>{comment.comment}</Typography> 
                <Typography>Le {comment.timestamp}</Typography> 
                </Grid>
              </Grid>
            </Paper>
          )):
          <Typography variant="subtitle1">Aucun commentaire</Typography>
          }
          <Paper>
            <FormControl variant="outlined">
              <InputLabel
                
              >
                Commenter
              </InputLabel>
              <OutlinedInput
                id="component-outlined"
                labelWidth={400}
                style={{margin:"10px"}}
              />
            </FormControl>
          </Paper>
          
        </Paper>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

/* eslint-disable */
const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});
/* eslint-enable */

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
