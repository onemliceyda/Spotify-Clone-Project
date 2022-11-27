import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import axios from   "axios"

//TODO: Fix `any` types here

interface IDiscoverProps {}

interface IDiscoverState {
  newReleases: Array<any>;
  playlists: Array<any>;
  categories: Array<any>;
  token: string;
}

export default class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      token:"",
    };
  }

  //TODO: Handle APIs
   //playlists

   async componentDidMount() {
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
 const res= await fetch('https://accounts.spotify.com/api/token',authParameters)
 const data= await res.json()
  this.setState({token:data.access_token})
  console.log(data.access_token);

  
 await axios("https://api.spotify.com/v1/browse/featured-playlists", {
  method:"GET",
  headers: {
      Authorization: 'Bearer ' + this.state.token,       
  },
})
       .then( res => {
        const playlists =  res.data.playlists.items;
        console.log(res.data);
        this.setState({ playlists });
      }).catch((error) => {
        console.log("error", error.message);
      })
      console.log(this.state);

  }

  render() {
    const { newReleases, playlists, categories } = this.state;
    console.log(this.state.token);
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
