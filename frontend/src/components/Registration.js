import React from 'react';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();

    return (
        <div className='auth-container'>
            <h2 className='auth-title' style={{fontSize: 50}}>Connect</h2>
            <hr style={{backgroundColor: '#32ff7e', border: 'none', height: '1px', width: '300px', marginBottom: '23px'}}/>
            <button className='auth-button' style={{width: '300px', height: '80px', fontSize: 30, marginBottom: 15}} onClick={() => navigate('/signin')}>Sign In</button>
            <button className='auth-button' style={{width: '300px', height: '80px', fontSize: 30}} onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    );
};

export default Registration;