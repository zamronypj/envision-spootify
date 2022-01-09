import React from 'react';

function Tracks({ items }) {

    return (
        <div>
                {
                    items &&
                    items.length ?
                        items.map(({track_number, name, track}) => (
                            <div key={track.id}>({track_number}) {name}</div>
                        )) : null
                }
        </div>
    );
}

export default Tracks;
