import React, {useState, useContext, useEffect, useCallback} from 'react'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import spotifyApi from '../../common/services/SpotifyApi'
import PlaylistBlock from '../../common/components/PlaylistBlock'
import useIsMounted from '../../useIsMounted'

function Playlist() {
    const [playlists, setPlaylists] = useState([])

    //track if component is mounted or not
    //we need this to avoid setting spotify API result when component is
    //unmounted to avoid leak.
    //proper way is to cancel async API request but spotifyapi lib not
    //yet provide a way to cancel request
    const isMounted = useIsMounted();

    const accessToken = useContext(AccessTokenContext)

    const loadPlaylists = useCallback(() => {
        if (!accessToken || !isMounted) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getFeaturedPlaylists({
            country : 'ID'
        }).then(function(data) {
            if (isMounted) {
                setPlaylists(data.body.playlists.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, isMounted])

    useEffect(() => {
        loadPlaylists()
        return () => {
            //TODO: we should abort getFeaturedPlaylists() here in case
            //it has not yet completed but spotifyApi lib not yet provide
            //a way to cancel
        }
    }, [loadPlaylists])

    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <PlaylistBlock text="Playlist" id="playlist-result" data={playlists} />
        </div>
    );
}

export default Playlist;
