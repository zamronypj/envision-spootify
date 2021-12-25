import React from 'react'
import './_searchinput.scss'

function SearchInput({keyword, setKeyword}) {

    return (
        <div>
            <label htmlFor="header-search">
                <span className="visually-hidden">Search</span>
            </label>
            <input
                type="text"
                value={keyword}
                onInput={e => setKeyword(e.target.value)}
                id="header-search"
                placeholder="Search"
                name="keyword"
            />
        </div>
    );
}

export default SearchInput;
