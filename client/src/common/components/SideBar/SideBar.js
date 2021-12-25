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
import {Link } from 'react-router-dom'
import SpotifyWebApi from "spotify-web-api-node"
import config from "../../../config"
import './_sidebar.scss';

const spotifyApi = new SpotifyWebApi({
  clientId: config.api.clientId,
});

function renderSideBarOption(link, icon, text, { selected } = {}) {
  return (
    <div
        className={cx('sidebar__option', { 'sidebar__option--selected': selected })}
    >
      <Link to={link}>
          <FontAwesomeIcon icon={icon} />
          <p>{text}</p>
      </Link>
    </div>
  )
}

export default function SideBar({ accessToken }) {
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
              {renderSideBarOption('/', faHeadphonesAlt, 'Discover', { selected: true })}
              {renderSideBarOption('/search', faSearch, 'Search')}
              {renderSideBarOption('/favourites', faHeart, 'Favourites')}
              {renderSideBarOption('/playlists', faPlayCircle, 'Playlists')}
              {renderSideBarOption('/charts', faStream, 'Charts')}
            </div>
        </div>
    );
}
