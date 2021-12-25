import React from 'react'
import SearchItem from '../SearchItem';
import './_searchresult.scss'

function SearchResult({ keyword, id, data, imagesKey = 'images' }) {

    return (
        <div className="search-result-block">
            <div className="search-result-block__row" id={id}>
                {data.map(({ album, id, name }) => (
                    <SearchItem key={id} images={album[imagesKey]} name={name} />
                ))}
            </div>
        </div>
    );
}

export default SearchResult;
