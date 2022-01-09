import React, {useCallback, useEffect, useState, useContext} from 'react'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import PlaylistBlock from '../../common/components/PlaylistBlock'
import useIsMounted from '../../useIsMounted'

function Favourite() {
    const [favourites, setFavourites] = useState([])

    //track if component is mounted or not
    //we need this to avoid setting spotify API result when component is
    //unmounted to avoid leak
    //proper way is to cancel async API request but spotifyapi lib not
    //yet provide a way to cancel request
    const isMounted = useIsMounted();

    const accessToken = useContext(AccessTokenContext)

    /**
     * load user playlist using useCallback() hook to avoid
     * multiple endpoint calls.
     */
     const loadFavourites = useCallback(() => {
        if (!accessToken || !isMounted) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getUserPlaylists().then(function(data) {
            if (isMounted) {
                setFavourites(data.body.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, isMounted]);

    useEffect(() => {
        loadFavourites();
        return () => {
            //TODO: we should abort getUserPlaylists() here in case
            //it has not yet completed but spotifyApi lib not yet provide
            //a way to cancel
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
