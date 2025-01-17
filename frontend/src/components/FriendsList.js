import React from 'react';
import '../styles/List.css';

const FriendsList = () => {

    return (
        <div className='list-container'>
            <h2>Friends:</h2>
            {[1, 2, 3].map((friend, index) => (
                <div key={index} className='item'>
                    <div className='circle'></div>
                    <span>Name</span>
                </div>
            ))}
        </div>
    );
};

export default FriendsList;