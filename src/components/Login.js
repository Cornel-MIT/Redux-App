import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(login(email, password));
    setIsLoading(false);                      
  };

  return (
    <div className="container">
    <div className="heading">Sign In</div>
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
        required
      />
      <span className="forgot-password">
        <button type="button" className="forgot-password-link" onClick={() => navigate('/forgot-password')}>
          Forgot Password?
        </button>
      </span>
      <button type="submit" className="login-button" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign In'}
      </button>
      <div className="social-account-container">
        <span className="title">Or Sign in with</span>
        <div className="social-accounts">
          <button className="social-button google">
            {/* Insert Google SVG here */}
          </button>
          <button className="social-button apple">
            {/* Insert Apple SVG here */}
          </button>
          <button className="social-button twitter">
            {/* Insert Twitter SVG here */}
          </button>
        </div>
      </div>
      <span className="agreement">
        <button type="button" className="agreement-link" onClick={() => window.open('https://example.com/user-license-agreement', '_blank')}>
          Learn user licence agreement
        </button>
      </span>
    </form>
    {error && <p>{error}</p>}
    <p>Don't have an account? <Link to="/register">Register here</Link></p>
  </div>
  );
};

export default Login;