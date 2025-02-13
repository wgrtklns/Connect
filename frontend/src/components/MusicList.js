import React from 'react';
import '../styles/List.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../AppContext';

const MusicList = () => {
    const {music, deleteMusic, isLoading, fetchMusic} = useAppContext();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='list-container'>
            <h2>Music:</h2>
            {music.length < 1 && <h3>Music list empty...</h3>}
            {music.map(({id, trackname, artist, img}) => (
            <div key={id} className='item'>
                <div className='circle'>{img}</div>
                <span style={{marginTop: '15px'}}>{trackname} <h5 style={{marginTop: '5px', fontWeight: 'lighter'}}>{artist}</h5></span>
                <span className='delete' onClick={() => deleteMusic(id)}>
                    <FontAwesomeIcon icon={faBan} style={{color: "#ff7a7e"}} />
                </span>
            </div>
            ))}
        </div>
    )
};


export default MusicList;