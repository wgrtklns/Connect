import React, { useEffect } from 'react';
import '../styles/List.css';
import { useAppContext } from '../AppContext';

const Profile = () => {
    const {profile, music, isLoading, fetchProfile} = useAppContext();

    useEffect(() => {
        fetchProfile(localStorage.getItem('username'))
        // console.log(localStorage.getItem('username'))
    }, []);

    if (isLoading) {
        return <div className='list-container'>Loading profile...</div>;
    }

    if (!profile) {
        return <div className='list-container'>Profile not available</div>;
    }

    return (
        <div className='list-container'>
            <h2>Profile</h2>
            <div className='profileCircle'>{profile.img}</div>
            <h3>{profile.username}</h3>
                <h2>Music:</h2>
                {music.length > 0 && music.map(({id, audioname, artist, img}, index) => (
                  <div key={id} className='item' style={{backgroundColor: '#1c1c1c'}}>
                      {/* <div className='circle' style={{marginRight: 'auto'}}>{img}</div>
                      <span style={{marginTop: '15px', marginLeft: 'auto'}}>{username} <h5 style={{marginTop: '5px', fontWeight: 'lighter'}} className='abcc'>{artist}</h5></span> */}
                      <div className='circle'>{img}</div>
                      <span >{audioname} <h5 style={{marginTop: '5px', fontWeight: 'lighter'}} className='abcc'>{artist}</h5></span>
                  </div>
                ))}
            
        </div>
    );
};

export default Profile;