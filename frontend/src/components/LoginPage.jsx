import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Mail, Lock, User } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username:"",
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // For displaying error messages
  const [loading, setLoading] = useState(false); // To show loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData);
  
      setLoading(false); // Stop loading
  
      const expirationTime = new Date().getTime() + 3600000; // 5000 ms = 5 seconds

      // Save token and user details to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username); // Save the username in localStorage
      localStorage.setItem('tokenExpiration', expirationTime);  // Store the expiration time
      
      alert('Login successful!');
      // Redirect to the dashboard or another page
      window.location.href = '/';
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-100" style={{ maxWidth: '400px' }}>
        <div className="card-header text-center">
          <h4>Welcome Back</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
          <div className="mb-3">
              <label htmlFor="email" className="form-label">
                username
              </label>
              <div className="input-group">
              <span className="input-group-text">
                <User />
              </span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>
            
            
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <Mail />
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <Lock />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? <Loader2 className="spinner-border spinner-border-sm" /> : 'Sign In'}
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          <p className="text-muted">
            Don't have an account? <Link to={'/food_recipe_finder/signup'}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
