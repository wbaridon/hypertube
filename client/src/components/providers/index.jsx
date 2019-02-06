import React from 'react';
import PropTypes from 'prop-types';
import googleIcon from 'Assets/icons/google.png';
import githubIcon from 'Assets/icons/github.png';
import fortytwoIcon from 'Assets/icons/42.png';
import gitlabIcon from 'Assets/icons/gitlab.png';
import instagramIcon from 'Assets/icons/instagram.png';
import facebookIcon from 'Assets/icons/facebook.png';
import { Button, Avatar, Grid } from '@material-ui/core';


const providers = [
  {
    name: 'Google',
    icon: googleIcon,
    tooltip: 'login.provider.google',
    url: AUTHGOOGLE,
  },
  {
    name: 'Github',
    icon: githubIcon,
    tooltip: 'login.provider.github',
    url: AUTHGITHUB,
  },
  {
    name: '42',
    icon: fortytwoIcon,
    tooltip: 'login.provider.fortytwo',
    url: AUTH42,
  },
  {
    name: 'Gitlab',
    icon: gitlabIcon,
    tooltip: 'login.provider.gitlab',
    url: AUTHGITLAB,
  },
  {
    name: 'Instagram',
    icon: instagramIcon,
    tooltip: 'login.provider.instagram',
    url: AUTHINSTAGRAM,
  }, {
    name: 'Facebook',
    icon: facebookIcon,
    tooltip: 'login.provider.facebook',
    url: AUTHFACEBOOK,
  },
];

function Providers({ direction }) {
  return (
    <Grid container direction={direction} alignContent="center" alignItems="center" justify="space-around">
      {providers.map(provider => (
        <Grid key={provider.url} item>
          <Button title={provider.tooltip} href={provider.url} size="small">
            {provider.name}
            <Avatar src={provider.icon} />
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}

Providers.propTypes = {
  direction: PropTypes.string,
};

Providers.defaultProps = {
  direction: 'row',
};

export default Providers;
