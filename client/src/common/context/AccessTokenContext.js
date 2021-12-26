/**
 * Context data for access token that will be passed down
 * to inner children so that we can avoid props drilling
 */
import React, { createContext } from "react";

export const AccessTokenContext = createContext();

export const AccessTokenProvider = ({ accessToken, children }) => {

  return (
    <AccessTokenContext.Provider value={accessToken}>
      {children}
    </AccessTokenContext.Provider>
  );
};