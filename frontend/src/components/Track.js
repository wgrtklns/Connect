import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import '../styles/Track.css';
import '../styles/Auth.css';
import '../styles/List.css'
import { useAppContext } from '../AppContext';

const Track = () => {
    const {trackdata, isLoading} = useAppContext();
    const [isPlay, setPlay] = useState(true);

    const changePlay = () => {
      if (isPlay) {
        setPlay(false)
        console.log('STOP')
      } else {
        setPlay(true)
        console.log('START')
      }
    }

    const skipTrack = () => {
      console.log('Skip_track')
    }

    const addTrack = () => {
      console.log('Add_track')
    }

    const addFriend = () => {
      console.log('Add_friend')
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
        <div className='list-container'>
          <div className='profile-info-conatiner'>
            <h2>{trackdata.user.username}</h2>
            <div className='profileCircle'>{trackdata.user.img}</div>
            <button className='auth-button' style={{width: '266px', height: '50px', marginBottom: '30px'}} onClick={addFriend}>Add to friends</button>
            <hr style={{backgroundColor: '#32ff7e', border: 'none', height: '1px', width: '300px', marginBottom: '30px'}}/>
          </div>
          <div className='track-info-container'>
            <h3>{trackdata.trackname} - {trackdata.artist}</h3>
            <div className='track-controls'>
                <button className='choise-button' onClick={skipTrack}>
                  <FontAwesomeIcon icon={faThumbsDown} size="2x" style={{color: "#ff7a7e",}} />
                </button>
                <button className='choise-button' onClick={addTrack}>
                  <FontAwesomeIcon icon={faThumbsUp} size="2x" style={{color: "#32ff7e"}}/>
                </button>
            </div>
            <button className='auth-button' style={{width: '266px', height: '50px'}} onClick={changePlay}>
                {isPlay && <FontAwesomeIcon icon={faPlay} style={{color: "#1c1c1c"}}/>}
                {!isPlay && <FontAwesomeIcon icon={faPause} style={{color: "#1c1c1c"}}/>}
            </button>
          </div>
        </div>
    );
};

export default Track;