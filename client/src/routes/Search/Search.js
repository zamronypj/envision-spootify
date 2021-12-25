import React, { useEffect, useState, useContext, useCallback } from 'react'
import SearchInput from './components/SearchInput'
import SearchResult from './components/SearchResult'
import SpotifyWebApi from 'spotify-web-api-node'
import config from '../../config'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import './_search.scss'

const spotifyApi = new SpotifyWebApi({
  clientId: config.api.clientId,
})

function Search() {
    const [keyword, setKeyword] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const accessToken = useContext(AccessTokenContext)

    /**
     * load search track using useCallback() hook to avoid
     * multiple endpoint calls.
     */
    const loadSearch = useCallback(() => {
        if (!accessToken || !keyword) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.searchTracks(keyword).then(function(data) {
            setSearchResults(data.body.tracks.items);
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, keyword]);

    useEffect(() => {
        loadSearch();
    }, [loadSearch])

    return (
        <div className="search-result">
            <h2>Search Tracks</h2>
            <SearchInput keyword={keyword} setKeyword={setKeyword} />
            <SearchResult text="Search Result" id="search-result" data={searchResults} />
        </div>

    );
}

export default Search;
