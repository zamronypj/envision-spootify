
const cfg = {
    api : {
      authUrl : "https://accounts.spotify.com/authorize?client_id=" +
          process.env.REACT_APP_SPOTIFY_CLIENT_ID +
          "&response_type=code&redirect_uri=" +
          process.env.REACT_APP_SPOTIFY_REDIRECT_URI +
          "&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
    }
}

export default cfg;
