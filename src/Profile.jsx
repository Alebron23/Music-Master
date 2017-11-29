import React, { Component } from 'react';
import './App.css';

/**
 * Display the artist picture with genre details 
 * @class
 */
class Profile extends Component {

	/**
	 * @function
	 * @return {reactElement}
	 */
	render() {
		
		/** Object to hold artist info template. Gets set to artist object received from spotify */
		let artist = {name:'', followers: {total: ''}, images: [{url: ''}], genres: []};

		artist = this.props.artist != null ? this.props.artist : artist;		//ternary expression
		
		/** Return artist picture and profile information. */
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
		)
	}
}

export default Profile;