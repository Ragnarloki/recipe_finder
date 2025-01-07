import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      const username = localStorage.getItem('username'); // Retrieve the username from localStorage

      if (!username) {
        setError('User not logged in');
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/favorites/${username}`);
        setFavorites(response.data);
        console.log(response.data);  // Log the response data instead of state
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to fetch favorites.');
      }
    };

    fetchFavorites();
  }, []);

  const deleteItem = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/items/${id}`)
      .then(() => {
        // Remove the deleted item from the favorites state using functional form of setFavorites
        setFavorites((prevFavorites) => prevFavorites.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}  {/* Show error message if any */}
      {favorites && favorites.length > 0 ? (
        <div className="car">
          {favorites.map((item, index) => (
            <div key={index} className="ca" style={{ width: '18rem', borderRadius: '20px' }}>
              <img
                src={item.thumbnail}
                width={288}
                height={300}
                style={{ borderRadius: '20px' }}
                alt={item.name}
              />
              <p className="card-title" style={{ marginLeft: '4px' }}>
                {item.name}
              </p>
              <div className='d-flex justify-content-center'>
                <Link to={`/food_recipe_finder/recipe/${item.product}`}>
                  <button style={{ marginLeft: '4px' }} className="btn btn-primary">
                    Recipe Details
                  </button>
                </Link>
                <button onClick={() => deleteItem(item._id)} style={{ marginLeft: '4px' }} className="btn btn-danger">
                  Delete
                </button>
              </div>        
            </div>
          ))}
        </div>
      ) : (
        <h1>No favorites yet!</h1>
      )}
    </div>
  );
}

export default Favorites;
