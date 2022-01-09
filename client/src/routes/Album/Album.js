import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useParams } from 'react-router'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import useIsMounted from '../../useIsMounted'
import './_album.scss'

function Album() {
    let { albumId } = useParams();
    const [albumData, setAlbumData] = useState([])

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
    const loadAlbum = useCallback(() => {
        if (!accessToken || !isMounted || !albumId) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getAlbum(albumId).then(function(data) {
            if (isMounted) {
                setAlbumData(data.body);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, albumId, isMounted]);

    useEffect(() => {
        loadAlbum();
        return () => {
            //TODO: we should abort getAlbum() here in case
            //it has not yet completed but spotifyApi lib not yet provide
            //a way to cancel
        }
    }, [loadAlbum])

    return (
        <div className="album-result">
            <div className="album-heading">
                <div className="heading-container">
                    <img src={albumData.images[0].url}></img>
                </div>
                <div className="heading-container">
                    <h2>{albumData.name}</h2>
                    <div>Artist: {
                        albumData.artists && albumData.artists.length ?
                            albumData.artists.map(({ name }) => (
                                <span className="artist-name">{name}</span>
                            )) :
                            <span>Unknown artists</span>
                    }</div>
                    <div>Label: {albumData.label}</div>
                    <div className="mt-sm">{
                        albumData.copyrights && albumData.copyrights.length ?
                            albumData.copyrights.map(({ text }) => (
                                <span>{text}</span>
                            )) :
                            null
                    }</div>
                </div>
            </div>
            <div className="album-body">
                <h3 className="bold">Tracks</h3>
                {
                    albumData.tracks &&
                    albumData.tracks.items &&
                    albumData.tracks.items.length ?
                        albumData.tracks.items.map(({track_number, name}) => (
                            <div>({track_number}) {name}</div>
                        )) : null
                }
            </div>
        </div>

    );
}

export default Album;
