import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import { FiLogOut } from 'react-icons/fi'; // Import logout icon from React Icons
import '../App.css';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handlelogout = () => {
    // Clear token and other data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('tokenExpiration');
    
    // Redirect to login page after logout
    navigate('/food_recipe_finder/login'); // Navigate to login page
    // Optionally, refresh the page:
    // window.location.reload(); // Uncomment if you want to reload the page after logout
  };

  return (
    <div className='bar'>
      <Link to={'/'} className='bar_h1'>
        <h3>HOME</h3>
      </Link>

      {/* Only show the 'FAVORITES' link if a token exists */}
      {token ? (
        <div className='d-flex justify-between'>
          <Link to={'/food_recipe_finder/favorites/'} className='bar_h1'>
            <h3>FAVORITES</h3>
          </Link>
          {/* Replace "Logout" with a logout icon */}
          <button 
            className='bar-h1' 
            style={{ backgroundColor: "black", color: "white", border: "none", fontSize: "25px" }}
            onClick={handlelogout}
          >
            <FiLogOut size={25} /> {/* Logout icon with size */}
          </button>
        </div>
      ) : (
        <div className='d-flex justify-between'>
          <Link to="/food_recipe_finder/login" className='bar_h1'>
            <h3>Login</h3>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
