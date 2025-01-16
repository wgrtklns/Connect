import React from 'react';
import '../styles/List.css';

const MusicForm = () => {
    return (
        <div className='container'>
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
            <button className='add-button'>+</button>
        </div>
    );
};

export default MusicForm;