import React from 'react'
import SearchItem from '../../../routes/Search/components/SearchItem';
import './_playlistblock.scss'

function PlaylistBlock({id, data, imagesKey = 'images' }) {

    return (
        <div className="search-result-block">
            <div className="search-result-block__row" id={id}>
                {
                    data && data.length ?
                        data.map(({ [imagesKey] : images, id, name }) => (
                            <SearchItem key={id} images={images} name={name} />
                        ))
                    : <div>You do not have any items yet.</div>
                }
            </div>
        </div>
    );
}

export default PlaylistBlock;
