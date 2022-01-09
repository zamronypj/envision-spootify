import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useParams } from 'react-router'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import useIsMounted from '../../useIsMounted'
import './_playlist-detail.scss'
import ImgDefault from '../../assets/images/hero.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function PlaylistDetail() {
    let { playlistId } = useParams();
    const [playlistData, setPlaylistData] = useState([])

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
    const loadPlaylist = useCallback(() => {
        if (!accessToken || !isMounted || !playlistId) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getPlaylist(playlistId).then(function(data) {
            if (isMounted) {
                setPlaylistData(data.body);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, playlistId, isMounted]);

    useEffect(() => {
        loadPlaylist();
        return () => {
            //TODO: we should abort getPlaylist() here in case
            //it has not yet completed but spotifyApi lib not yet provide
            //a way to cancel
        }
    }, [loadPlaylist])

    return (
        <div className="playlist-result">
            <div className="album-heading">
                <div className="heading-container">
                    {
                        playlistData.images && playlistData.images.length ?
                            <img src={playlistData.images[0].url}></img> :
                            <img src={ImgDefault} width="200"></img>
                    }
                </div>
                <div className="heading-container">
                    <h2>{playlistData.name}</h2>
                    <div>
                    {
                        playlistData.owner ?
                            <span>{playlistData.owner.display_name}</span>
                            : null
                    }
                    {
                        playlistData.followers ?
                            <span>
                                <FontAwesomeIcon icon={faHeart} />
                                <span className="p-xs">{playlistData.followers.total}</span>
                            </span>
                            : null
                    }
                    </div>
                </div>
            </div>
            <div className="album-body">
                <h3 className="bold">Tracks</h3>
                {
                    playlistData.tracks ?
                    <div>
                            {
                                playlistData.tracks.items &&
                                playlistData.tracks.items.length ?
                                playlistData.tracks.items.map(({track}) => (
                                        <div key={track.id}>{track.name}</div>
                                    )) : null
                            }
                    </div>

                        : <div>No tracks</div>
                }
            </div>
        </div>

    );
}

export default PlaylistDetail;
