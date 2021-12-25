import React from 'react';
import config from '../../../config'
import Logo from '../../../assets/images/hero.svg';

import './_login.scss'

function Login() {
  return (
    <div className="main">
        <div className="login-page">
            <div>
                <img src={Logo} width="400" />
            </div>
            <div>
              <a href={config.api.authUrl}>
                  Login with Spotify
              </a>

            </div>
        </div>
    </div>
  );
}

export default Login;
