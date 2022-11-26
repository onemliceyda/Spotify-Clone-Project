import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import axios from 'axios';

//TODO: Fix `any` types here

interface IDiscoverProps {}

interface IDiscoverState {
  newReleases: Array<any>;
  playlists: Array<any>;
  categories: Array<any>;
}

export default class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  //TODO: Handle APIs
  componentDidMount() {
    var spotify_client_id=process.env.REACT_APP_SPOTIFY_CLIENT_ID
    var spotify_client_secret=process.env.REACT_APP_SPOTIFY_CLIENT_SECRET 
  
  //API access token
  var authParameters={
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body:'grant_type=client_credentials&client_id='+spotify_client_id+'&client_secret='+spotify_client_secret
  }
  fetch('https://accounts.spotify.com/api/token',authParameters)
  .then(result=>result.json())
  .then(data=>console.log((data.access_token)));

  
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
