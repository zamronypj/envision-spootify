import React, {useState, useContext, useEffect, useCallback} from 'react'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import spotifyApi from '../../common/services/SpotifyApi'
import PlaylistBlock from '../../common/components/PlaylistBlock'

function Playlist() {
    const [playlists, setPlaylists] = useState([])
    const accessToken = useContext(AccessTokenContext)

    const loadPlaylists = useCallback(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getFeaturedPlaylists({
            country : 'ID'
        }).then(function(data) {
            setPlaylists(data.body.playlists.items);
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken])

    useEffect(() => {
        loadPlaylists()
    }, [loadPlaylists])

    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <PlaylistBlock text="Playlist" id="playlist-result" data={playlists} />
        </div>
    );
}

export default Playlist;
