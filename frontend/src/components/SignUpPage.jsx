import React, { useState } from 'react';
import { Lock, Mail,User } from 'lucide-react';
import './css/SignUpPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Add axios for making API requests
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // For displaying errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the signup data to the backend
      const response = await axios.post('http://localhost:3000/signup', formData);
      alert(response.data); // You can modify how you handle success (e.g., redirect to login)
      setFormData({
        username:'',
        email: '',
        password: '',
      });
      window.location.href = '/food_recipe_finder/login';
   
    } catch (err) {
      // Handle error
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card w-100" style={{ maxWidth: '400px' }}>
        <div className="card-header text-center">
          Create Account
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3">
                          <label className="form-label">username</label>
                          <div className="input-group">
                          <span className="input-group-text">
                            <User />
                          </span>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="you@example.com"
                              value={formData.username}
                              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                          </div>
                        </div>
            
    
            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
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
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Lock />
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Create Account
            </button>
          </form>
        </div>
        <div className="card-footer">
          <p className="text-muted">
            Already have an account? <Link to={'/food_recipe_finder/login'}>sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
