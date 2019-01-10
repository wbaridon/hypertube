import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import {
  updateUserField,
  updateUserImage,
} from 'Actions/';
import debounce from 'lodash.debounce';
import ImageChanger from '../image-changer';
import { dataURItoBlob } from '../image-changer/image-handle-functions';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.user,
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.debounced = debounce((token, field, value) => props.updateFieldHandle(token, field, value), 1500);
  }

  handleFieldChange(field, value) {
    const { token } = this.props;
    console.log(token, field, value);
    this.setState({ [field]: value });
    this.debounced(token, field, value);
  }

  handleImageChange(image) {
    const { picture } = this.state;
    const { updateImageHandle, token } = this.props;
    const form = new FormData();
    const img = dataURItoBlob(image.rawData);
    form.append('token', token);
    form.append('image', img);
    form.append('oldImageUrl', picture);
    updateImageHandle(form);
  }

  render() {
    const currentState = this.state;
    return (
      <div>
        <ImageChanger imageUrl={currentState.picture} handleImageChange={this.handleImageChange} />
        {Object.keys(currentState)
          .map(key => (
            <React.Fragment key={key}>
              <TextField
                fullWidth
                value={currentState[key]}
                label={key}
                onChange={e => this.handleFieldChange(key, e.target.value)}
              />
              <br />
            </React.Fragment>))}
      </div>
    );
  }
}


Settings.url = '/settings';
Settings.propTypes = {
  user: PropTypes.shape({
  }).isRequired,
  updateFieldHandle: PropTypes.func.isRequired,
  updateImageHandle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.user.token ? state.user.token : '',
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  updateFieldHandle: (token, field, value) => dispatch(updateUserField(token, field, value)),
  updateImageHandle: form => dispatch(updateUserImage(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
