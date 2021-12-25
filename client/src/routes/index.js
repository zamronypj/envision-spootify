import React from 'react'
import Discover from './Discover'
import Search from './Search'
import { Routes, Route } from 'react-router-dom'

export default function AppRoutes() {
    return (
        <Routes>
            <Route exact path='/' element={< Discover />} />
            <Route exact path='/search' element={< Search />} />
        </Routes>
    );
}
