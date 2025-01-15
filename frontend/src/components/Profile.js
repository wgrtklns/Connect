import React from 'react';
import '../styles/List.css';

const Profile = () => {
    return (
        <div className='list-container'>
            <h2>Profile</h2>
            <div className='profileCircle'></div>
            <h3>Favorites:</h3>
            {[1, 2, 3].map((item, index) => (
              <div key={index} className='item'>
                <div className='circle'></div>
                <span>music</span>
              </div>
            ))}
        </div>
    );
};

export default Profile;