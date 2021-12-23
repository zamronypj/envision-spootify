import React, {useState, useEffect} from 'react';
import { AccessTokenProvider } from '../../context/AccessTokenContext'

function Body({ accessToken, children }) {
    return (
        <div className="main__content__child">
            <AccessTokenProvider accessToken={accessToken} children={children} />
        </div>
    );
}

export default Body;
