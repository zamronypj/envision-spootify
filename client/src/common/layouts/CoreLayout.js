import React from 'react';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import './_corelayout.scss';

// Url - http://localhost:3000/?code=accessTokenCode
// This will get url string after the '?' & .get() will get the code value from the url
const code = new URLSearchParams(window.location.search).get('code')

function CoreLayout({ children , history }) {
  return (
    <div className="core-layout">
        {code ? <Dashboard code={code} children={children} /> : <Login />}
    </div>
  );
}

export default CoreLayout;
