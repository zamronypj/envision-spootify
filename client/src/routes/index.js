import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Discover from './Discover'
import Search from './Search'
import Playlist from './Playlist';
import Chart from './Chart';
import Favourite from './Favourite';
import Album from './Album';
import PlaylistDetail from './PlaylistDetail';
import TrackDetail from './TrackDetail';

export default function AppRoutes() {
    return (
        <Routes>
            <Route exact path='/' element={< Discover />} />
            <Route exact path='/search' element={< Search />} />
            <Route exact path='/playlists' element={< Playlist />} />
            <Route exact path='/favourites' element={< Favourite />} />
            <Route exact path='/charts' element={< Chart />} />
            <Route path='/album/:albumId' element={< Album />} />
            <Route path='/playlist/:playlistId' element={< PlaylistDetail />} />
            <Route path='/track/:trackId' element={< TrackDetail />} />
        </Routes>
    );
}
