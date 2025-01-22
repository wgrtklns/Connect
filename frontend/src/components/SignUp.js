import React, { useState } from 'react';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const SignUp = () => {
    const navigate = useNavigate();
    const {changeAuth} = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(email)
      console.log(username)
      console.log(password)
      if (true) {
        changeAuth(true)
        localStorage.setItem('token-shmoken', 'token')
        navigate('/profile')
      } else {
        console.error('Error SignUp')
        e.preventDefault()
      }
    }
    return (
        <div className="auth-container">
          <h2 className="auth-title">Sign Up</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="username"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="auth-button">
              Sing Up
            </button>
          </form>
        </div>
      );
};

export default SignUp;