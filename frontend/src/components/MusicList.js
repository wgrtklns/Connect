import React from 'react';
import '../styles/List.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

const MusicList = () => {
    return (
        <div className='list-container'>
            <h2>My Music</h2>
            {["My way", "Sigma Boy", "In Motion"].map((music, index) => (
            <div key={index} className='item'>
                <div className='circle'></div>
                <span>{music}</span>
                <span className='delete' >
                    <FontAwesomeIcon icon={faBan} style={{color: "#ff7a7e",}} />
                </span>
            </div>
            ))}
        </div>
    )
};


export default MusicList;