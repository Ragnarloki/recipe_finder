import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const token = localStorage.getItem('token');

  return (
    <div className='bar'>
      <Link to={'/'} className='bar_h1'>
        <h3>HOME</h3>
      </Link>

      {/* Only show the 'FAVORITES' link if a token exists */}
      {token ? (
        <Link to={'/food_recipe_finder/favorites/'} className='bar_h1'>
          <h3>FAVORITES</h3>
        </Link>
      ) : (
        // Optionally, you can show a login link or just leave the favorites link out
        <Link to="/food_recipe_finder/login" className='bar_h1'>
          <h3>Login to access Favorites</h3>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
