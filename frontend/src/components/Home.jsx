import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import { GlobalContext } from './GlobalContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for the toast notifications
import { Button, Carousel } from 'react-bootstrap';
import Fooddata from '../data.json'; // Import the JSON file directly


// const DataFetcher = () => {
//   // State to store the data and loading state
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // API endpoint
//     const url = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes"; // Replace with your RapidAPI URL
//     const headers = {
//       'X-RapidAPI-Key': 'bf588ab8f9msh2aebdcef094f1adp1bb55fjsnf088cbe6d2b5',
// 		        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'// Replace with the API host
//     };
    
//     // Fetching data from the API
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url, {
//           method: "GET",
//           headers: headers,
//         });
        
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const result = await response.json();  // Parse JSON data
//         setData(result);  // Set the data state
//         console.log(data);
//       } catch (error) {
//         setError(error.message);  // Set the error message
//       } finally {
//         setLoading(false);  // Stop loading when the data is fetched
//       }
//     };

//     fetchData();  // Call the function to fetch data
//   }, []);  // Empty array to run this only once when the component mounts

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Fetched Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>  {/* Display the data */}
//     </div>
//   );
// };

// const SaveJsonButton = () => {
//   const { recipeList } = useContext(GlobalContext);

//   const handleSaveJson = () => {
//     // Step 1: Convert JSON object to a string
//     const jsonString = JSON.stringify(recipeList, null, 2); // The second parameter here adds indentation

//     // Step 2: Create a Blob object with the JSON data
//     const blob = new Blob([jsonString], { type: 'application/json' });

//     // Step 3: Create a temporary download link and trigger it
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'data.json'; // Name of the file being downloaded
//     link.click();

//     // Clean up the URL object after the download
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <button onClick={handleSaveJson}>
//       Save JSON as File
//     </button>
//   );
// };


const FoodSlideshow = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false); // State to toggle "VIEW ALL"
  const itemsPerPage = 3; // Number of items visible per slide

  useEffect(() => {
    setData(Fooddata); // Load data from JSON
  }, []);

  // Handle "Next" button
  const handleNext = () => {
    if (currentIndex + itemsPerPage < data.length) {
      setIsAnimating(true); // Start animation
      setTimeout(() => {
        setCurrentIndex(currentIndex + itemsPerPage);
        setIsAnimating(false); // End animation after transition
      }, 300); // Duration matches animation time
    }
  };

  // Handle "Previous" button
  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsAnimating(true); // Start animation
      setTimeout(() => {
        setCurrentIndex(currentIndex - itemsPerPage);
        setIsAnimating(false); // End animation after transition
      }, 300); // Duration matches animation time
    }
  };

  // Handle "VIEW ALL" button
  const handleViewAllToggle = () => {
    setIsViewAll((prev) => !prev); // Toggle the "View All" state
  };

  // Get visible items based on the currentIndex or "View All" mode
  const visibleItems = isViewAll ? data : data.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="font-weight-bold">Must Try Recipes</h5>
        <Button variant="outline-dark" size="sm" onClick={handleViewAllToggle}>
          {isViewAll ? "VIEW LESS" : "VIEW ALL"}
        </Button>
      </div>

      {/* Card Row with Animation */}
      <div className={`row ${isAnimating ? "fade-in" : ""}`}>
        {visibleItems.map((item, index) => (
          <div className="col-sm-4 mb-3" key={index}>
            <div className="card h-100 shadow border-0">
              {/* Card Image */}
              <img
                src={item.thumbnail_url}
                className="card-img-top rounded"
                alt={item.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              {/* Card Body */}
              <div className="card-body ">
                <div className='d-flex justify-content-between align-middle'>
                <h6 className="card-title text-truncate ">{item.name}</h6>
                <div className=''>
                  <Link to={`/food_recipe_finder/recipe/${item.id}`}>
                    <button className="btn btn-primary btn-sm">Details</button>
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {!isViewAll && (
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="outline-dark"
            size="sm"
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            <i className="bi bi-chevron-left"></i> Previous
          </Button>
          <Button
            variant="outline-dark"
            size="sm"
            disabled={currentIndex + itemsPerPage >= data.length}
            onClick={handleNext}
          >
            Next <i className="bi bi-chevron-right"></i>
          </Button>
        </div>
      )}
    </div>
  );
};





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
      <FoodSlideshow />
      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default Home;
