import React, { useState, useEffect, useCallback } from "react";
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch, faStream,
} from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg'
import {Link, useLocation } from 'react-router-dom'
import spotifyApi from '../../services/SpotifyApi'
import './_sidebar.scss';

function renderSideBarOption(link, icon, text, { selected } = {}) {
  return (
    <Link to={link}>
      <div
          className={cx('sidebar__option', { 'sidebar__option--selected': selected })}
      >
            <FontAwesomeIcon icon={icon} />
            <p>{text}</p>
      </div>
    </Link>
  )
}

export default function SideBar({ accessToken }) {
    const location = useLocation();

    const [user, setUser] = useState({
      display_name: "",
      images: [],
    });

    const loadMe = useCallback(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);

        //Get user details with help of accessToken
        spotifyApi.getMe().then(data => {
            setUser(data.body)
        })
    }, [accessToken]);

    useEffect(() => {
        loadMe()
    }, [loadMe]);

    return (
        <div className="sidebar">
            <div className="sidebar__profile">
              <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
              <p>{user?.display_name}</p>
            </div>
            <div className="sidebar__options">
              {renderSideBarOption('/', faHeadphonesAlt, 'Discover', { selected: (location.pathname === '/') })}
              {renderSideBarOption('/search', faSearch, 'Search', { selected: (location.pathname === '/search') })}
              {renderSideBarOption('/favourites', faHeart, 'Favourites', { selected: (location.pathname === '/favourites') })}
              {renderSideBarOption('/playlists', faPlayCircle, 'Playlists', { selected: (location.pathname === '/playlists') })}
              {renderSideBarOption('/charts', faStream, 'Charts', { selected: (location.pathname === '/charts') })}
            </div>
        </div>
    );
}
