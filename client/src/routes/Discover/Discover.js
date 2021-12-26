import React, { useEffect, useState, useContext, useCallback } from 'react'
import DiscoverBlock from './DiscoverBlock'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import useIsMounted from '../../useIsMounted'
import './_discover.scss'

function Discover() {
    const [newReleases, setNewReleases] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [categories, setCategories] = useState([])

    //track if component is mounted or not
    //we need this to avoid setting spotify API result when component is
    //unmounted
    const isMounted = useIsMounted()

    const accessToken = useContext(AccessTokenContext)

    /**
     * load new release using useCallback() hook to avoid
     * multiple endpoint calls
     */
    const loadNewRelease = useCallback(() => {
        if (!accessToken || !isMounted) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getNewReleases().then(function(data) {
            if (isMounted) {
                setNewReleases(data.body.albums.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, isMounted]);

    const loadPlaylists = useCallback(() => {
        if (!accessToken || !isMounted) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getFeaturedPlaylists().then(function(data) {
            if (isMounted){
                setPlaylists(data.body.playlists.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, isMounted])


    /**
     * load categories using useCallback() hook to avoid
     * multiple endpoint calls
     */
     const loadCategories = useCallback(() => {
        if (!accessToken || !isMounted) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getCategories().then(function(data) {
            if (isMounted) {
                setCategories(data.body.categories.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, isMounted])

    useEffect(() => {
        loadNewRelease();
        loadPlaylists()
        loadCategories()
        return () => {}
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
