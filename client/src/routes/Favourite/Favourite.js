import React, {useRef, useCallback, useEffect, useState, useContext} from 'react'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import PlaylistBlock from '../../common/components/PlaylistBlock'

function Favourite() {
    const [favourites, setFavourites] = useState([])

    //track if component is mounted or not
    //we need this to avoid setting spotify API result when component is
    //unmounted
    const componentMounted = useRef(true);

    const accessToken = useContext(AccessTokenContext)

    /**
     * load user playlist using useCallback() hook to avoid
     * multiple endpoint calls.
     */
     const loadFavourites = useCallback(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getUserPlaylists().then(function(data) {
            if (componentMounted.current) {
                setFavourites(data.body.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken]);

    useEffect(() => {
        loadFavourites();
        return () => {
            componentMounted.current = false;
        }
    }, [loadFavourites])

    return (
        <div className="favourite">
            <h2>Favourite</h2>
            <PlaylistBlock text="Favourites" id="favourites-result" data={favourites} />
        </div>
    );
}

export default Favourite;
