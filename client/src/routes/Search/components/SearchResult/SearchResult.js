import React from 'react'
import SearchItem from '../SearchItem';
import './_searchresult.scss'

function SearchResult({ link, id, data, imagesKey = 'images' }) {

    return (
        <div className="search-result-block">
            <div className="search-result-block__row" id={id}>
                {data.map(({ album, id, name }) => (
                    <SearchItem link={link} id={id} key={id} images={album[imagesKey]} name={name} />
                ))}
            </div>
        </div>
    );
}

export default SearchResult;
