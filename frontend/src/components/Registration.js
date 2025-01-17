import React from 'react';
import '../styles/Auth.css';

const Registration = () => {
    return (
        <div className='auth-container'>
            <h2 className='auth-title' style={{fontSize: 50}}>Connect</h2>
            <button className='auth-button' style={{width: '300px', height: '80px', fontSize: 30, marginBottom: 15}}>Sign In</button>
            {/* <p className='auth-title'>- or -</p> */}
            <button className='auth-button' style={{width: '300px', height: '80px', fontSize: 30}}>Sign Up</button>
        </div>
    );
};

export default Registration;