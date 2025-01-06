import React, { useContext, useState } from 'react';
import '.././App.css';
import { GlobalContext } from './GlobalContext';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Home() {
  const { id } = useParams();
  const { searchParam, setParam, submitHandler, isLoggedIn } = useContext(GlobalContext); // Include isLoggedIn from context
  const { recipeList } = useContext(GlobalContext);
  const navigate = useNavigate(); // Hook for navigation

  // Handler for input change
  function onchangeHandler(e) {
    setParam(e.target.value);
  }

  // Function to add recipe to favorites with ID and thumbnail
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (id, thumbnail_url) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    setIsClicked(true);
    console.log("isClicked");
  
    if (!token) {
      // If user is not logged in, redirect to login page
      alert('Please login to add to favorites!');
      navigate('/food_recipe_finder/login'); // Redirect to login page
      return;
    }
    
    // If logged in, proceed to add to favorites
    axios
      .post('http://localhost:3000/recipe', {username, id, thumbnail_url })
      .then((result) => {
        alert('Recipe added to favorites!');
      })
      .catch((err) => console.error('Error:', err));
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
          <button type="submit" className="button" disabled={isClicked} >
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
                  <button
                    style={{ marginLeft: '4px' }}
                    className="btn btn-primary"
                  >
                    Recipe Details
                  </button>
                </Link>

                <button
                  onClick={() => handleClick(item.id, item.thumbnail_url)} // Pass both id and thumbnail_url
                  style={{ marginLeft: '4px' }}
                  className="btn btn-primary"
                >
                  Add to Favorite
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
