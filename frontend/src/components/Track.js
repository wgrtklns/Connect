import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import '../styles/Track.css';
import '../styles/Auth.css';
import '../styles/List.css'

const Track = () => {
    return (
        <div className='list-container'>
            <h2>username</h2>
            <div className='profile'>
              <button className='addProfile'>+</button>
              <div className='profileCircle'></div>
            </div>
            <h3>TRACK NAME - ARTIST</h3>
            <div className='track-controls'>
                <button className='choise-button'>
                  <FontAwesomeIcon icon={faThumbsDown} size="2x" style={{color: "#ff7a7e",}} />
                </button>
                <button className='choise-button'>
                  <FontAwesomeIcon icon={faThumbsUp} size="2x" style={{color: "#32ff7e"}}/>
                </button>
            </div>
            <button className='auth-button' style={{width: '266px', height: '50px'}}>
                <FontAwesomeIcon icon={faPlay} style={{color: "#1c1c1c"}}/>
                {/* <FontAwesomeIcon icon={faPause} style={{color: "#1c1c1c"}}/> */}
            </button>
        </div>
    );
};

export default Track;