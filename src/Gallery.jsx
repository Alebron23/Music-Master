import React, { Component} from 'react';
import './App.css';

class Gallery extends Component {

	//need a constructor becuase you need a state 
	//for the playing music.
	constructor(props) {

		super(props);

		this.state = {
			playingUrl: '',
			audio: null,
			playing: false
		}
	}

	playAudio(previewUrl) {
		let audio = new Audio(previewUrl);
		
		if(!this.state.playing) {

			audio.play();
			this.setState({
				playing: true,
				playingUrl: previewUrl,
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
					playing: true,
					playingUrl: previewUrl,
					audio

				})
			}
		}
	}

	render() {

		//console.log('Gallery props', this.props.gallery);
		const tracks = this.props.tracks;

		if(tracks !== null){
            return (
				<div>
                    {
                        tracks.map((track, k) => {

                            console.log('track', track);
                            const trackImg = track.album.images[0].url;

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
                        })
                    }
				</div>
            )
		} else {
			return null;
		}
	}
}

export default Gallery;


