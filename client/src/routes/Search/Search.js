import React, { useEffect, useState, useContext, useCallback } from 'react'
import SearchInput from './components/SearchInput'
import SearchResult from './components/SearchResult'
import spotifyApi from '../../common/services/SpotifyApi'
import { AccessTokenContext } from '../../common/context/AccessTokenContext'
import useIsMounted from '../../useIsMounted'
import './_search.scss'

function Search() {
    const [keyword, setKeyword] = useState('')
    const [searchResults, setSearchResults] = useState([])

    //track if component is mounted or not
    //we need this to avoid setting spotify API result when component is
    //unmounted to avoid leak
    //proper way is to cancel async API request but spotifyapi lib not
    //yet provide a way to cancel request
    const isMounted = useIsMounted();

    const accessToken = useContext(AccessTokenContext)

    /**
     * load search track using useCallback() hook to avoid
     * multiple endpoint calls.
     */
    const loadSearch = useCallback(() => {
        if (!accessToken || !isMounted || !keyword) return;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.searchTracks(keyword).then(function(data) {
            if (isMounted) {
                setSearchResults(data.body.tracks.items);
            }
        }, function(err) {
            console.log("Something went wrong!", err);
        });
    }, [accessToken, keyword, isMounted]);

    useEffect(() => {
        loadSearch();
        return () => {
            //TODO: we should abort searchTracks() here in case
            //it has not yet completed but spotifyApi lib not yet provide
            //a way to cancel
        }
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
