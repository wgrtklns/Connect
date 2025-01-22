import React, { useState } from 'react';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const SignIn = () => {
    const navigate = useNavigate()
    const {changeAuth} = useAppContext();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(login)
      console.log(password)
      if (true) { // Если пользователь умпешно авторизован
        changeAuth(true)
        localStorage.setItem('token-shmoken', 'token')
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
              placeholder="email or username"
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