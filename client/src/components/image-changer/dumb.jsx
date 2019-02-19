import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  ButtonBase,
  Typography,
  IconButton,
  Button,
  CardHeader,
} from '@material-ui/core';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import RotateRight from '@material-ui/icons/RotateRight';
import RotateLeft from '@material-ui/icons/RotateLeft';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Flip from '@material-ui/icons/Flip';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import styles from './styles';

function ImageChangerDumb({
  classes, intl,
  image,
  handleImageAdd,
  flip,
  rotateClockwise,
  rotateCounterClockwise,
  offsetY,
}) {
  return (
    <Card>
      <CardHeader title={<Typography variant="h6"><FormattedMessage id="settings.imageChangeTitle" /></Typography>} />
      <CardMedia image="squelchImageMessage">
        {
          image.rawData
            ? (
              <React.Fragment>
                <ButtonBase
                  focusRipple
                  className={classes.image}
                  focusVisibleClassName={classes.focusVisible}
                  component="label"
                  style={{
                    width: '100%',
                  }}
                >
                  <input onChange={e => handleImageAdd(e.target.files[0], true)} style={{ display: 'none' }} type="file" />
                  <span
                    className={classes.imageSrc}
                    style={{
                      backgroundImage: `url(${image.rawData})`,
                    }}
                  />
                  <span className={classes.imageBackdrop} />
                  <span className={classes.imageButton}>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="error"
                      className={classes.imageTitle}
                    >
                      {intl.formatMessage({ id: 'register.profilePicture' })}
                    </Typography>
                  </span>
                </ButtonBase>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton onClick={rotateCounterClockwise} aria-label="Rotate CCW">
                    <RotateLeft />
                  </IconButton>
                  {(image.isLandscape && image.orientation <= 4) || (!image.isLandscape && image.orientation > 4) ? null
                    : (
                      <IconButton onClick={() => offsetY(-10)} aria-label="offset down">
                        <ArrowDropDown />
                      </IconButton>
                    )
                  }
                  <IconButton onClick={flip} aria-label="Flip">
                    <Flip />
                  </IconButton>
                  {(image.isLandscape && image.orientation <= 4) || (!image.isLandscape && image.orientation > 4) ? null
                    : (
                      <IconButton onClick={() => offsetY(10)} aria-label="offset up">
                        <ArrowDropUp />
                      </IconButton>
                    )
                  }
                  <IconButton onClick={rotateClockwise} aria-label="Rotate CW">
                    <RotateRight />
                  </IconButton>
                </div>
              </React.Fragment>
            )
            : (
              <Button component="label" label="add image" className={classes.photoButton}>
                <input onChange={e => handleImageAdd(e.target.files[0], true)} style={{ display: 'none' }} type="file" />
                <AddPhotoAlternate />
                <Typography color={!image.error ? 'default' : 'error'}>{`${intl.formatMessage({ id: image.error ? image.error : 'register.addImage' })}`}</Typography>
              </Button>
            )
        }
      </CardMedia>
    </Card>
  );
}


ImageChangerDumb.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  image: PropTypes.shape({
    rawData: PropTypes.string,
    inputFile: PropTypes.shape({}),
    verticalOffset: PropTypes.number,
    isLandscape: PropTypes.bool,
    orientation: PropTypes.number,
    error: PropTypes.string,
  }),
  handleImageAdd: PropTypes.func.isRequired,
  flip: PropTypes.func.isRequired,
  rotateClockwise: PropTypes.func.isRequired,
  rotateCounterClockwise: PropTypes.func.isRequired,
  offsetY: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

ImageChangerDumb.defaultProps = {
  image: {
    rawData: null,
    inputFile: null,
    verticalOffset: 0,
    isLandscape: true,
    orientation: 1,
    error: '',
  },
};

export default injectIntl(withStyles(styles)(ImageChangerDumb));
