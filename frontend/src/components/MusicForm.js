import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import '../styles/List.css';
import '../styles/Music.css';

const MusicForm = () => {


    const shareData = () => {
        console.log("SHARE")
    }

    return (
        <div className='list-container'>
            <h2>Add music</h2>
            <div className='upload-box'>...</div>
            <p>with...</p>
            <div className='radio-group'>
                <label>
                    <input type="radio" name="uploadType" value="friends" /> friends
                </label>
                <label>
                    <input type="radio" name="uploadType" value="others" /> others
                </label>
            </div>
            <button className='add-button' onClick={() => shareData()}>
                <FontAwesomeIcon size='2x' icon={faFileImport} style={{color: "#1c1c1c",}} />
            </button>
        </div>
    );
};

export default MusicForm;