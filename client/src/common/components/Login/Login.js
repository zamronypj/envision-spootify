import React from 'react';
import config from '../../../config'
import { ReactComponent as Hero } from '../../../assets/images/hero.svg';

import './_login.scss'

function Login() {
  return (
    <div className="main">
        <div className="login-page">
            <Hero />
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
