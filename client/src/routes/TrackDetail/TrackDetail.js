import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useParams } from 'react-router'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import useIsMounted from '../../useIsMounted'
import './_track-detail.scss'
import ImgDefault from '../../assets/images/hero.svg';

function TrackDetail() {
    let { trackId } = useParams();
    const [trackData, setTrackData] = useState([])

    //track if component is mounted or not
    //we need this to avoid setting spotify API result when component is
    //unmounted to avoid leak
    //proper way is to cancel async API request but spotifyapi lib not
    //yet provide a way to cancel request
    const isMounted = useIsMounted();

    const accessToken = useContext(AccessTokenContext)

    /**
     * load album track using useCallback() hook to avoid
     * multiple endpoint calls.
     */
    const loadTrack = useCallback(() => {
        if (!accessToken || !isMounted || !trackId) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getTrack(trackId).then(function(data) {
            if (isMounted) {
                setTrackData(data.body);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, trackId, isMounted]);

    useEffect(() => {
        loadTrack();
        return () => {
            //TODO: we should abort getTrack() here in case
            //it has not yet completed but spotifyApi lib not yet provide
            //a way to cancel
        }
    }, [loadTrack])

    return (
        <div className="track-result">
            <div className="album-heading">
                <div className="heading-container">
                    {
                        trackData.album &&
                        trackData.album.images &&
                        trackData.album.images.length ?
                            <img src={trackData.album.images[0].url}></img> :
                            <img src={ImgDefault} width="200"></img>
                    }
                </div>
                <div className="heading-container">
                    <h2>{trackData.name}</h2>
                    <div>Artist: {
                        trackData.artists && trackData.artists.length ?
                            trackData.artists.map(({ name }) => (
                                <span className="artist-name">{name}</span>
                            )) :
                            <span>Unknown artists</span>
                    }</div>
                    {
                        trackData.album ?
                            <div>Album: {trackData.album.name}</div>
                            : null

                    }
                </div>
            </div>
            <div className="album-body">
            </div>
        </div>

    );
}

export default TrackDetail;
