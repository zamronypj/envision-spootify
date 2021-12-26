import React, {useCallback, useEffect, useState, useContext} from 'react'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import PlaylistBlock from '../../common/components/PlaylistBlock'

function Chart() {
    const [charts, setCharts] = useState([])
    const accessToken = useContext(AccessTokenContext)

    /**
     * load chart using useCallback() hook to avoid
     * multiple endpoint calls.
     */
     const loadCharts = useCallback(() => {
        if (!accessToken) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getPlaylistsForCategory('toplists').then(function(data) {
            setCharts(data.body.playlists.items);
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken]);

    useEffect(() => {
        loadCharts();
    }, [loadCharts])


    return (
        <div className="chart">
            <h2>Chart</h2>
            <PlaylistBlock text="Charts" id="charts-result" data={charts} />
        </div>
    );
}

export default Chart;
