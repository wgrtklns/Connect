import React, { useState } from 'react';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate()
    const {changeAuth} = useAppContext();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault()
      const result = await axios.post('http://localhost:5012/api/user/login', {
        username: login,
        password: password
      })
      if (result.data.token) {
        changeAuth(true)
        localStorage.setItem('token', result.data.token)
        navigate('/profile')
      } else {
        console.error('Error SingIn')
        e.preventDefault()
      }
    }
    return (
        <div className="auth-container">
          <h2 className="auth-title">Sign In</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              className="auth-input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="auth-button">
              Sing In
            </button>
          </form>
        </div>
      );
};

export default SignIn;