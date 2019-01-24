import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { connect } from 'react-redux';


class Comments extends React.Component {
  componentWillMount() {
  }

  render() {
    const {
      comments,
    } = this.props;
    return (
      <Table>
        <TableBody>
          {comments.map(comment => (
            <TableRow key={comment.timestamp}>
              <TableCell>
                {comment.username}
              </TableCell>
              <TableCell>
                {comment.comment}
              </TableCell>
              <TableCell>
                {comment.timestamp}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
