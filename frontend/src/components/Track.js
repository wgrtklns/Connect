import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import '../styles/Track.css';
import '../styles/Auth.css';
import '../styles/List.css'
import { useAppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

const Track = () => {
    const {trackData, isLoading, addFriends, addMusic} = useAppContext();
    const [isPlay, setPlay] = useState(true);
    const audioRef = useRef(null);
    const navigate = useNavigate();

    const changePlay = () => {
      if (isPlay) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setPlay(!isPlay)
    }
    
    if (isLoading ||  !trackData) {
      return <div>Loading...</div>;
    }
    return (
        <div className='list-container'>
          <div className='profile-info-conatiner'>
            <h2>{trackData.user.username}</h2>
            <div className='profileCircle'>{trackData.user.img}</div>
            <button className='auth-button' style={{width: '266px', height: '50px', marginBottom: '30px'}} 
            onClick={() => addFriends(trackData.user)}>Add to friends</button>
            <hr style={{backgroundColor: '#32ff7e', border: 'none', height: '1px', width: '300px', marginBottom: '30px'}}/>
          </div>

          <div className='track-info-container'>
            <h3>{trackData.music.trackname} - {trackData.music.artist}</h3>
            <div className='track-controls'>
                <button className='choise-button' onClick={() => navigate('/music')}>
                  <FontAwesomeIcon icon={faThumbsDown} size="2x" style={{color: "#ff7a7e",}} />
                </button>
                <button className='choise-button' onClick={() => addMusic(trackData.music)}>
                  <FontAwesomeIcon icon={faThumbsUp} size="2x" style={{color: "#32ff7e"}}/>
                </button>
            </div>

            <button className='auth-button' style={{width: '266px', height: '50px'}} onClick={changePlay}>
                {isPlay && <FontAwesomeIcon icon={faPause} style={{color: "#1c1c1c"}}/>}
                {!isPlay && <FontAwesomeIcon icon={faPlay} style={{color: "#1c1c1c"}}/>}
            </button>

            <audio ref={audioRef} src={trackData.music.audioUrl}></audio>
          </div>
        </div>
    );
};

export default Track;