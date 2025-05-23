import React, {useEffect} from 'react';
import '../styles/List.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../AppContext';

const MusicList = () => {
    const {music, deleteMusic, isLoading, fetchMusic} = useAppContext();

    useEffect(() => {
            fetchMusic()
    }, []);

    if (isLoading) {
        return <div className='list-container'>Loading...</div>;
    }

    return (
        <div className='list-container'>
            <h2>Music:</h2>
            {music.length < 1 && <h3>Music list empty...</h3>}
            {music.map(({id, audioname, artist, img}, index) => (
                <div key={index} className='item'>
                    <div className='circle'>{img}</div>
                    <span style={{marginTop: '15px'}}>
                        {audioname} 
                        <h5 style={{marginTop: '5px', fontWeight: 'lighter'}}>{artist}</h5>
                    </span>
                    <span className='delete' onClick={() => deleteMusic(audioname, id)}>
                        <FontAwesomeIcon icon={faBan} style={{color: "#ff7a7e"}} />
                    </span>
                </div>
            ))}
            <div>
    
            </div>
        </div>
    )
};


export default MusicList;