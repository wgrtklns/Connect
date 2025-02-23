import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import '../styles/List.css';
import '../styles/Header.css'
import { useAppContext } from '../AppContext';

const FriendsList = () => {
    const {friends, deleteFriends, isLoading, fetchFriends} = useAppContext();
    
    useEffect(() => {
        fetchFriends()
    }, [])

    if (isLoading) {  
        return <div>Loading...</div>;
    } 
    return (
        <div className='list-container'>
            <h2>Friends:</h2>
            {friends.length < 1 && <h3>Friends list empty...</h3>}
            {friends.map(({id, username, img}, index) => (
                <div key={index} className='item'>
                    <div className='circle'>{img}</div>
                    <span>{username}</span>
                    <span className='delete' onClick={() => deleteFriends(id)}>
                        <FontAwesomeIcon icon={faBan} style={{color: "#ff7a7e"}} />
                    </span>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;