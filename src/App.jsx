import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {

	/**
	 * @constructor
	 * @param {*} props 
	 */
	constructor(props) {
		super(props);

		/**
		 * @type {object}
		 * @property {string} query - the search typed by the user
		 * @property {object} artist - holds artist object recieved from spotify api
		 * @property {Array} tracks - holds all the tracks from the artist
		 * @property {boolean} firstVisit - to indicate wether to display the welcome message or not.  
		 */
		this.state = {
			query		: '', 	
			artist		: null,
			tracks		: [],
			firstVisit	: true
		}
	}

	/** 
	 * Compose the endpoint strings and fetch the data from the spotify api.
	 * @function 
	*/
	search = () => {

		const BASE_URL   = 'https://api.spotify.com/v1/search?';
		let FETCH_URL    = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
		const ALBULM_URL = 'https://api.spotify.com/v1/artists/';	
		let accessToken  = 'BQAGx8-OWVc6Gl_aE_JltwbK5QozeIaOGpcFmR_mQ_hGA9Nb4qKHg4k79c74XcUQAclMDg9oW3YrkU0YKbNTvC8fvRjNpncxln7ru9rybSMCqr9VGg7VBt26UwjyoGCnNtbvpqDC76Az1YlRYezWXsWDEE3vxg4&refresh_token=AQD42mmShXMZ7yXzYzgXP-ZPbiXfySvwytA-7gy2okiUB3Obv6nWPwzu0eZiB48hiWhvbv5LeKL5sRyc9_d0vMgjGeR0ga1vwnBgtkvLJj15F_2ldfL1ameqE8HovgJC1Lo';
		
		this.setState({firstVisit: false}); 

		var myOptions = {
			method: 'GET',
			headers: {
			  'Authorization': 'Bearer ' + accessToken
			},
			mode: 'cors',
			cache: 'default'
		  };
		  
		  /** fetch the artist profile info. */
		  fetch(FETCH_URL, myOptions)
		  		.then(response => {	
					return response.json();
				})

				.then(json => { 							

					/** if no items were returned the search turned up empty */
					if(json.artists.items.length === 0){

						const artist = null;
						this.setState({artist});

						const tracks = null;
						this.setState({tracks});
						throw Error('No results found');
					} else {

						/** since we are only searching for one artist, we know that it is always in the first position of the json object. */
						const artist = json.artists.items[0];
						this.setState({artist});
						FETCH_URL = `${ALBULM_URL}${artist.id}/top-tracks?country=US&`;
						
						/** fetch the tracks for the artist */
						fetch(FETCH_URL, myOptions)
							.then(response => response.json())
			
							.then(json => {
								const tracks = json.tracks;	
								console.log(tracks);
								this.setState({tracks});
							})
					} 
				});	  
	}

	/**
	 * show the search box and once the user searches something then display the results
	 * with the artist photo,data and the tracks if there are any. If no results display no results 
	 * @function
	 * @return {reactElement}
	 */
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