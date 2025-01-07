import React, { useContext, useState } from 'react';
import '../App.css';
import { GlobalContext } from './GlobalContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for the toast notifications

function Home() {
  const { id } = useParams();
  const { searchParam, setParam, submitHandler, isLoggedIn } = useContext(GlobalContext);
  const { recipeList } = useContext(GlobalContext);
  const navigate = useNavigate();
  
  // State to manage loading status
  const [loading, setLoading] = useState(false);

  // Handler for input change
  function onchangeHandler(e) {
    setParam(e.target.value);
  }

  // Function to add recipe to favorites with ID and thumbnail
  const handleClick = (thumbnail_url, product) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token) {
      // If user is not logged in, redirect to login page
      toast.error('Please login to add to favorites!'); // Use toast instead of alert
      navigate('/food_recipe_finder/login'); // Redirect to login page
      return;
    }
    
    setLoading(true); // Set loading to true while request is in progress

    // If logged in, proceed to add to favorites
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/recipe`, { username, product, thumbnail_url })
      .then((result) => {
        toast.success('Recipe added to favorites!'); // Show success toast
      })
      .catch((err) => {
        console.error('Error:', err);
        toast.error('Failed to add recipe to favorites! or it already in the favorites'); // Show error toast
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request is completed
      });
  };

  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <center>
            <h1>FOREIGN FOODS ONLY</h1>
          </center>
          <input
            type="text"
            value={searchParam}
            onChange={onchangeHandler}
            placeholder="search the food name here"
            width={700}
            height={300}
            autoFocus
          />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </center>

      <div>
        {recipeList && recipeList.length > 0 ? (
          <div className="car">
            {recipeList.map((item, index) => (
              <div
                key={index}
                className="ca"
                style={{ width: '18rem', borderRadius: '20px' }}
              >
                <img
                  src={item.thumbnail_url}
                  alt=""
                  width={288}
                  style={{ borderRadius: '20px' }}
                  height={300}
                />

                <p className="card-title" style={{ marginLeft: '4px' }}>
                  {item.name}
                </p>
                <Link to={`/food_recipe_finder/recipe/${item.id}`}>
                  <button style={{ marginLeft: '4px' }} className="btn btn-primary">
                    Recipe Details
                  </button>
                </Link>

                <button
                  onClick={() => handleClick(item.thumbnail_url, item.id)} // Pass both id and thumbnail_url
                  style={{ marginLeft: '4px' }}
                  className="btn btn-primary"
                  disabled={loading} // Disable button while the request is in progress
                >
                  {loading ? 'Adding to Favorites...' : 'Add to Favorite'}
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default Home;
