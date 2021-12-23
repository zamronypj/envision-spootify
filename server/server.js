const express = require('express')
const cors = require('cors')
const spotifyWebApi = require('spotify-web-api-node')
const app = express()

const port = process.env.PORT || 9000;

app.use(cors())
app.use(express.json());

const credentials = {
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
};

app.get('/', (req, res) => {
    res.json({ spotify : 'api'});
})

app.post('/login', (req,res) => {
    let spotifyApi = new spotifyWebApi(credentials)

    //Get the "code" value posted from the client-side and get the user's accessToken from the spotify api
    const code = req.body.code

    // Retrieve an access token
    spotifyApi.authorizationCodeGrant(code).then((data) => {
        // Returning the User's AccessToken in the json format
        res.json({
            accessToken : data.body.access_token,
        })
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(400)
    })
})


app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    let spotifyApi = new spotifyWebApi({...credentials, refreshToken});

    spotifyApi
      .refreshAccessToken()
      .then((data) => {
          // console.log(data.body);
          res.json({
              accessToken: data.body.access_token,
              expiresIn: data.body.expires_in,
          })
      })
      .catch((err) => {
          console.log(err);
         res.sendStatus(400);
      });
});

app.listen(port, () => {
    console.log(`Spotify auth server listening at http://localhost:${port}`)
})