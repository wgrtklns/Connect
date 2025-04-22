import React, { useContext, useEffect } from 'react';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const Registration = () => {
    const {isAuth} = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/profile');
        }
    }, [isAuth, navigate]);
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