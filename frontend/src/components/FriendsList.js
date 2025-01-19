import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import '../styles/List.css';
import { useAppContext } from '../AppContext';

const FriendsList = () => {
    const {friends, setFriends, isLoading} = useAppContext();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='list-container'>
            <h2>Friends:</h2>
            {friends.map(({id, username, img}) => (
                <div key={id} className='item'>
                    <div className='circle'>{img}</div>
                    <span>{username}</span>
                    <span className='delete' >
                        <FontAwesomeIcon icon={faBan} style={{color: "#ff7a7e",}} />
                    </span>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;