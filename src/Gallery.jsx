import React, { Component} from 'react';
import './App.css';

/**
 * Display the tracks with image and button to play/pause
 * @class
 */
class Gallery extends Component {

	/**
	 * @constructor
	 * @param {*} props 
	 */
	constructor(props) {

		super(props);

		/**
         * @type {object} 
         * @property {string} playingUrl - # url for audio.
         * be highlighted or not. 
         * @property {object} audio - audio object.
		 * @property {boolean} playing - boolean if song is playing or not. 
		 */
		this.state = {
			playingUrl	: '',
			audio		: null,
			playing		: false
		}
	}

	/**
	 * function to play and pause the audio. 
	 * @function
	 * @param {*} previewUrl 
	 */
	playAudio(previewUrl) {

		let audio = new Audio(previewUrl);
		
		if(!this.state.playing) {

			audio.play();

			this.setState({
				playing		: true,
				playingUrl	: previewUrl,
				audio
			})
		} else {

			if(this.state.playingUrl === previewUrl){

				this.state.audio.pause();

				this.setState({
					playing: false
				})
			} else {

				this.state.audio.pause();

				audio.play();

				this.setState({
					playing		: true,
					playingUrl	: previewUrl,
					audio
				});
			}
		}
	}

	/**
	 * Map over the tracks and return the track image with a play and pause button on top of it. 
	 * If the preview for that track is null then display nothing and if no tracks display then display message. 
	 * @function
	 * @return {reactElement}
	 */
	render() {

		const tracks = this.props.tracks;
		let nullTracks = 0;

		/** If search did not come back empty then display the tracks if they have previews.*/
		if(tracks !== null){	

            return (
				<div>
                    {
                        tracks.map((track, k) => {

                            const trackImg = track.album.images[0].url;

							if(track.preview_url !== null){

								return (
									<div key={k} className="track" onClick={() => this.playAudio(track.preview_url)}>
										<img src={trackImg} className="track-img" alt="track"/>

										<div className="track-play">
											<div className="track-play-inner">

												{
													this.state.playingUrl === track.preview_url
														? <span>| |</span>
														: <span>&#9654;</span>
												}
											</div>
										</div>

										<p className="track-text">
											{track.name}
										</p>
									</div>
                            	)
							}else {

								nullTracks++;
								
								/** If all the tracks previews were null then no tracks will display */
								if(nullTracks === 10){
									return 'No tracks to play.'
								} else {
									return '';
								}			
							}
                        })
                    }
				</div>
            )
		} else {
			/** The render function has to return something, so if the search came back empty then return null. */
			return (<div></div>);	
		}
	}
}

export default Gallery;


