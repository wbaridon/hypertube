const styles = theme => ({
  image: {
    position: 'relative',
    height: 310,
    [theme.breakpoints.up('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 310,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageTitle': {
        border: '1px solid currentColor',
        backgroundColor: '#ffffffff',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 310,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    imageOrientation: 'from-image',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    top: 136,
    padding: '3px 50px 5px 50px',
    transition: '0.5s',
  },
  photoButton: {
    width: '100%',
    height: 310,
  },
  photoContainer: {
    width: '100%',
  },
  card: {
    minWidth: '310px',
  },
  flexFinish: {
    flexGrow: 1,
  },
});
export default styles;
