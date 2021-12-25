import React, { createContext } from "react";

export const AccessTokenContext = createContext();

export const AccessTokenProvider = ({ accessToken, children }) => {

  return (
    <AccessTokenContext.Provider value={accessToken}>
      {children}
    </AccessTokenContext.Provider>
  );
};