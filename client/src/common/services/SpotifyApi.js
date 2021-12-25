import SpotifyWebApi from 'spotify-web-api-node'
import config from '../../config'

const spotifyApi = new SpotifyWebApi({
    clientId: config.api.clientId,
})

export default spotifyApi

