import React from 'react';
import '../styles/Auth.css';

const SignIn = () => {
    const {isAuth, }

    return (
        <div className="auth-container">
          <h2 className="auth-title">Sign In</h2>
          <form className="auth-form">
            <input
              type="text"
              placeholder="email or username"
              className="auth-input"
            />
            <input
              type="password"
              placeholder="password"
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              Sing In
            </button>
          </form>
        </div>
      );
};

export default SignIn;