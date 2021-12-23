import React from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import Player from '../Player';
import Body from '../Body';
import useAuth from '../../../useAuth'

function Dashboard({ code, children , history }) {
  const accessToken = useAuth(code);

  return (
    <div className="main">
        <SideBar accessToken={accessToken} />
        <div className="main__content">
            <Header accessToken={accessToken} history={history} />
            <Body accessToken={accessToken} history={history} children={children} />
        </div>
        <Player />
    </div>
  );
}

export default Dashboard;
