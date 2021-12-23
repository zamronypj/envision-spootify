import React from 'react';
import Header from '../Header';
import SideBar from '../SideBar';
import Player from '../Player';
import useAuth from '../../../useAuth'

function Dashboard({ code, children , history }) {
  const accessToken = useAuth(code);
  return (
    <div className="main">
        <SideBar accessToken={accessToken} />
        <div className="main__content">
            <Header accessToken={accessToken} history={history} />
            <div className="main__content__child">
                  {children}
            </div>
        </div>
        <Player />
    </div>
  );
}

export default Dashboard;
