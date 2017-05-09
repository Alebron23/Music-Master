import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
	render() {
		
		let artist = {name:'', followers: {total: ''}, images: [{url: ''}], genres: []};

		//ternary expression
		artist = this.props.artist != null ? this.props.artist: artist;

		return (
			<div className="profile"> 

				<img 
					alt="Profile"
					className="profile-img"
					src={artist.images[0].url} />

				<div className="profile-info">
					<div className="profile-name"> 
						{artist.name} 
					</div>
					<div className="profile-followers"> 
						{artist.followers.total} followers 
					</div>

					<div className="profile-genres">
						{
							artist.genres.map((genre, k) => {
								genre = genre !== artist.genres[artist.genres.length -1] 
												? ` ${genre},` 
												: ` & ${genre}`;
								return(
									<span key={k}>{genre}</span>
								)
							})
						}
					</div>
				</div>
			</div>
			//you have to map over the genres
			//javascript has a map function for arrays that allows you 
			//to map over them. the map function has to return the 
			//jsx just like the render function does. Each span tag has to
			//have a certain key property on it. 
			)
	}
}

export default Profile;