import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';


class Comments extends React.Component {
  componentWillMount() {
    const {
      comments,
    } = this.props;
  }

  render() {
    const {
      comments,
    } = this.props
    return (
      <Table>
      <TableBody>
        {comments.map(comment => (
          <TableRow key={comment.timestamp}>
          <TableCell> {comment.username} </TableCell>
          <TableCell> {comment.comment} </TableCell>
          <TableCell> {comment.timestamp} </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
