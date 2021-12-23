import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import spotifyApi from '../../../services/spotify';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    this.getNewReleases();
  }

  getNewReleases() {
    spotifyApi.getNewReleases({ limit : 5, offset: 0, country: 'SE' })
    .then(function(data) {
        console.log(data.body);
        this.setState({
          newReleases : data.body
        });
      }, function(err) {
         console.log("Something went wrong!", err);
      });
  }



  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
