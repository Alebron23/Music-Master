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

	search() {

		this.setState({firstVisit: false}); 										// Set the state so the proper message is displayed after the first search.

		const 	BASE_URL = 'https://api.spotify.com/v1/search?'; 					//the question mark initializes query parameters. have to get this from the spotify api. have to go to web api -> api endpoints on spotifies. website to get address. He didnt go over why the names are this way.
        const 	ALBULM_URL = 'https://api.spotify.com/v1/artists/';					//had to delete this part from the url {id}/top-tracks
		let 	FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1` 	//FETCH_URL is example of get method.

		fetch(FETCH_URL, {							//fetch method returns a promise, and a promise in javascript is code returned by a function that represents data. we will check for the promise in the callback function.
			method: 'GET'
		})

		.then(response => {

			if(!response.ok){

				const artist = null;
				this.setState({artist});

				const tracks = null;
				this.setState({tracks});

				throw Error(response.statusText);
			} else {
				return response.json();
			}
		})

		.then(json => { 							//since we are only searching for one artist, we know that it is always in the first position of the json object.
			
			const artist = json.artists.items[0];	//good to put the console.logs to check and see if you are actually getting the data.

			this.setState({artist});

			FETCH_URL = `${ALBULM_URL}${artist.id}/top-tracks?country=US&`

			fetch(FETCH_URL, {
				method: 'GET'
			})
				.then(response => response.json())

				.then(json => {
					const tracks = json.tracks;		//if json has same keys as your variable name you can just say {tracks} = json; and also works for multiple fields so you can declare them at once. Like {tracks, music, songs} = json;
					this.setState({tracks});
				})
		});
	}


	render() {
		return (									//input fields in react have an onchange function

			<div className="App">
				<h1 className="App-title"> Music Master </h1>

				<FormGroup>
					<InputGroup>

						<FormControl
						type="text"
						placeholder="Search for an Artist" 
						value={this.state.query}



						//
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
			</div> //the templating that you say before an artist was searched for is controlled by the <profile> so have to have op to check if the state has been entered yet.

		)
	}
}

export default App;