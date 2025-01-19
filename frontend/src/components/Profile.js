import React from 'react';
import '../styles/List.css';
import { useAppContext } from '../AppContext';

const Profile = () => {
    const {profile, music} = useAppContext();

    return (
        <div className='list-container'>
            <h2>Profile</h2>
            <div className='profileCircle'>{profile.img}</div>
            <h3>{profile.username}</h3>
                <h2>Music:</h2>
                {music.map(({id, username, artist, img}) => (
                  <div key={id} className='item'>
                      {/* <div className='circle' style={{marginRight: 'auto'}}>{img}</div>
                      <span style={{marginTop: '15px', marginLeft: 'auto'}}>{username} <h5 style={{marginTop: '5px', fontWeight: 'lighter'}} className='abcc'>{artist}</h5></span> */}
                      <div className='circle'>{img}</div>
                      <span >{username} <h5 style={{marginTop: '5px', fontWeight: 'lighter'}} className='abcc'>{artist}</h5></span>
                  </div>
                ))}
            
        </div>
    );
};

export default Profile;