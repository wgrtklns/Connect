import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faMusic, faUserGroup } from '@fortawesome/free-solid-svg-icons';

import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className='header'>
            <button className='header-button' onClick={() => navigate('/track')}>
                <FontAwesomeIcon icon={faBell}  size='2x' style={{color: "#32ff7e",}}/>
            </button> 
            <button className='header-button' onClick={() => navigate('/music')}>
                <FontAwesomeIcon icon={faMusic} size="2x" style={{color: "#32e17e",}}/>
            </button>
            <button className='header-button' onClick={() => navigate('/friends')}>
                <FontAwesomeIcon icon={faUserGroup} size='2x' style={{color: "#32e17e",}} />
            </button>
            <button className='header-button' onClick={() => navigate('/profile')}>
                <FontAwesomeIcon icon={faUser} size='2x' style={{color: "#32e17e",}} />
            </button>
        </header>
    );
};  

export default Header;