/**
 * authenticate user with Spotify API
 *
 * @credit: https://github.com/dipscoder/spotify-clone.git
 */

import { useEffect, useState } from "react";
import axios from "./axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("/login", { code })
      .then((response) => {
          //when success,remove any code pramater from url
          window.history.pushState({}, null, "/");
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
          setExpiresIn(response.data.expiresIn);
      })
      .catch(() => {
          //this should redirect to login page
          window.location = "/";
      });
  }, [code]);


  // Update accessToken automatically when it expires
  useEffect(() => {
      if (!refreshToken || !expiresIn) {
        return;
      }

      let interval = setInterval(() => {

      axios.post("/refresh", { refreshToken }).then((response) => {
          setAccessToken(response.data.accessToken);
          setExpiresIn(response.data.expiresIn);
      })
      .catch(() => {
          window.location = "/";
      });

    }, (expiresIn - 60) * 1000 );   //execute 1 min before expire Time

    // run cleanup
    return () => clearInterval(interval)

  }, [refreshToken, expiresIn]);

  return accessToken
}
