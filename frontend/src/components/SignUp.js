import React from 'react';
import '../styles/Auth.css';

const SignUp = () => {
    return (
        <div className="auth-container">
          <h2 className="auth-title">Sign Up</h2>
          <form className="auth-form">
            <input
              type="email"
              placeholder="email"
              className="auth-input"
            />
            <input
              type="text"
              placeholder="username"
              className="auth-input"
            />
            <input
              type="password"
              placeholder="password"
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              Sing Up
            </button>
          </form>
        </div>
      );
};

export default SignUp;