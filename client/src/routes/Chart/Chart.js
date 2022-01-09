import React, {useCallback, useEffect, useState, useContext} from 'react'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import PlaylistBlock from '../../common/components/PlaylistBlock'
import useIsMounted from '../../useIsMounted'

function Chart() {
    const [charts, setCharts] = useState([])

    //track if component is mounted or not
    //we need this to avoid setting spotify API result when component is
    //unmounted to avoid leak
    //proper way is to cancel async API request but spotifyapi lib not
    //yet provide a way to cancel request
    const isMounted = useIsMounted();

    const accessToken = useContext(AccessTokenContext)

    /**
     * load chart using useCallback() hook to avoid
     * multiple endpoint calls.
     */
     const loadCharts = useCallback(() => {
        if (!accessToken || !isMounted) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getPlaylistsForCategory('toplists').then(function(data) {
            if (isMounted) {
                setCharts(data.body.playlists.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, isMounted]);

    useEffect(() => {
        loadCharts();
        return () => {
            //TODO: we should abort getPlaylistsForCategory() here in case
            //it has not yet completed but spotifyApi lib not yet provide
            //a way to cancel
        }
    }, [loadCharts])


    return (
        <div className="chart">
            <h2>Chart</h2>
            <PlaylistBlock text="Charts" id="charts-result" data={charts} />
        </div>
    );
}

export default Chart;
