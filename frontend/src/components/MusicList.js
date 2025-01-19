import React from 'react';
import '../styles/List.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../AppContext';

const MusicList = () => {
    const {music, setMusic, isLoading} = useAppContext();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='list-container'>
            <h2>Music:</h2>
            {music.map(({id, username, artist, img}) => (
            <div key={id} className='item'>
                <div className='circle'>{img}</div>
                <span style={{marginTop: '15px'}}>{username} <h5 style={{marginTop: '5px', fontWeight: 'lighter'}}>{artist}</h5></span>
                <span className='delete' onClick={() => console.log('DELETE')}>
                    <FontAwesomeIcon icon={faBan} style={{color: "#ff7a7e"}} />
                </span>
            </div>
            ))}
        </div>
    )
};


export default MusicList;