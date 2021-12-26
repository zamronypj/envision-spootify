import React, { useRef, useEffect, useState, useContext, useCallback } from 'react'
import DiscoverBlock from './DiscoverBlock'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import './_discover.scss'

function Discover() {
    const [newReleases, setNewReleases] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [categories, setCategories] = useState([])

    //track if component is mounted or not
    //we need this to avoid setting spotify API result when component is
    //unmounted
    const componentMounted = useRef(true);

    const accessToken = useContext(AccessTokenContext)

    /**
     * load new release using useCallback() hook to avoid
     * multiple endpoint calls
     */
    const loadNewRelease = useCallback(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getNewReleases({
            limit : 5,
            offset: 0,
            country: 'ID',
        }).then(function(data) {
            if (componentMounted.current) {
                setNewReleases(data.body.albums.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken]);

    const loadPlaylists = useCallback(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getFeaturedPlaylists({
            limit : 5,
            offset: 0,
            country : 'ID'
        }).then(function(data) {
            if (componentMounted.current){
                setPlaylists(data.body.playlists.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken])


    /**
     * load categories using useCallback() hook to avoid
     * multiple endpoint calls
     */
     const loadCategories = useCallback(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getCategories({
            limit : 5,
            offset: 0,
            country: 'ID'
        }).then(function(data) {
            if (componentMounted.current) {
                setCategories(data.body.categories.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken])

    useEffect(() => {
        loadNewRelease();
        loadPlaylists()
        loadCategories()

        return () => {
            //called when component is unmounted
            componentMounted.current = false;
        }
    }, [loadNewRelease, loadPlaylists, loadCategories])

    return (
        <div className="discover">
            <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
            <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
            <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
        </div>

    );
}

export default Discover;
