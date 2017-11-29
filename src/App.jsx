import React, { Component } from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query		: '', 	// we are building a profile for the artist so there will be a profile component for the artist.
			artist		: null,
			tracks		: [],
			firstVisit	: true
		}
	}

	search () {
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
		const ALBULM_URL = 'https://api.spotify.com/v1/artists/';	
		let accessToken    = 'BQAGx8-OWVc6Gl_aE_JltwbK5QozeIaOGpcFmR_mQ_hGA9Nb4qKHg4k79c74XcUQAclMDg9oW3YrkU0YKbNTvC8fvRjNpncxln7ru9rybSMCqr9VGg7VBt26UwjyoGCnNtbvpqDC76Az1YlRYezWXsWDEE3vxg4&refresh_token=AQD42mmShXMZ7yXzYzgXP-ZPbiXfySvwytA-7gy2okiUB3Obv6nWPwzu0eZiB48hiWhvbv5LeKL5sRyc9_d0vMgjGeR0ga1vwnBgtkvLJj15F_2ldfL1ameqE8HovgJC1Lo';
		this.setState({firstVisit: false}); 

		var myOptions = {
			method: 'GET',
			headers: {
			  'Authorization': 'Bearer ' + accessToken
			},
			mode: 'cors',
			cache: 'default'
		  };
	  
		  fetch(FETCH_URL, myOptions)
		  		.then(response => {	
					return response.json();
				})

				.then(json => { 							//since we are only searching for one artist, we know that it is always in the first position of the json object.
					console.log(json);

					if(json.artists.items.length === 0){
						const artist = null;
						this.setState({artist});

						const tracks = null;
						this.setState({tracks});
						throw Error('No results found');
					} else {
						const artist = json.artists.items[0];	//good to put the console.logs to check and see if you are actually getting the data.
						this.setState({artist});
						FETCH_URL = `${ALBULM_URL}${artist.id}/top-tracks?country=US&`;
	
						fetch(FETCH_URL, myOptions)
							.then(response => response.json())
			
									.then(json => {
										const tracks = json.tracks;		//if json has same keys as your variable name you can just say {tracks} = json; and also works for multiple fields so you can declare them at once. Like {tracks, music, songs} = json;
										console.log(tracks);
										this.setState({tracks});
									})
					} 
				});
					
					

			// .then(response => response.json())
			// .then(json => {
			//   const artist = json.artists.items[0];        
			//   this.setState({ artist });
			// })
	  
	}

	// search() {
	// 	// https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123
	// 	// var client_id = '48c185f4d9dc45a1938fb4fe4af769e6'; // Your client id
	// 	// var client_secret = 'd64e0bbb4973400ba371fb37a847f168'; // Your secret
	// 	//curl -X GET "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks?country=ES" -H "Accept: application/json" -H "Authorization: Bearer BQApOYTmbQqDxi3ReNYQ8lWX5TmmVzq9mpdgTz010PYl0gQMBktoJ4ouIpNWB4zJuSiXaVMLNqILfOdoaUE83phqVbxt8CVDnX-gy8Nx3T96pzEHp4zz1AVdKUs2dRAONNzGMMluB-fCVr4"
	// 	this.setState({firstVisit: false}); 										// Set the state so the proper message is displayed after the first search.

	render() {
		return (							

			<div className="App">
				<h1 className="App-title"> Music Master </h1>

				<FormGroup>
					<InputGroup>

						<FormControl
						type="text"
						placeholder="Search for an Artist" 
						value={this.state.query}

						onChange={event => {this.setState({query: event.target.value})}} //event.target.value gets the value from the input field and sets the state with it. That way when enter is pressed or the search button clicked the state is already set.
						
						onKeyPress={event => {
							if (event.key === 'Enter') {
								this.search()
							}
						}} />

						<InputGroup.Addon onClick={() => this.search()}>
							<Glyphicon glyph="search"></Glyphicon>
						</InputGroup.Addon >

					</InputGroup>
				</FormGroup>
				{
					this.state.artist !== null && this.state.artist !== undefined
					?   <div> 
							<Profile artist={this.state.artist}/> 

							<Gallery tracks={this.state.tracks}/>
						</div>
					: this.state.firstVisit === true
						? <div>
							Welcome to Music Master. A Way to preview your favorite artists' songs.
						  </div>

						: <div> Your search did not return any results</div>
				}
			</div> 
		)
	}
}

export default App;