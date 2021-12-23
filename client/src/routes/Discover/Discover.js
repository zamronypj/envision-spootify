import React, { useEffect, useState, useContext } from 'react'
import DiscoverBlock from './DiscoverBlock'
import SpotifyWebApi from 'spotify-web-api-node'
import config from '../../config'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import './_discover.scss'

const spotifyApi = new SpotifyWebApi({
  clientId: config.api.clientId,
})

function Discover() {
    const [newReleases, setNewReleases] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [categories, setCategories] = useState([])
    const accessToken = useContext(AccessTokenContext)

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getNewReleases({
            limit : 5,
            offset: 0,
            country: 'SE'
        }).then(function(data) {
            setNewReleases(data.body.albums.items);
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getFeaturedPlaylists({
            limit : 5,
            offset: 0,
            country: 'SE'
        }).then(function(data) {
            setPlaylists(data.body.playlists.items);
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getCategories({
            limit : 5,
            offset: 0,
            country: 'SE'
        }).then(function(data) {
            setCategories(data.body.categories.items);
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    })

    return (
        <div className="discover">
            <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
            <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
            <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
        </div>

    );
}

export default Discover;