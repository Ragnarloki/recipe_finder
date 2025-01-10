import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from './GlobalContext';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Recipe.css'; // Import custom CSS file for styling

function Recipe() {
  const { id } = useParams();
  const { recipeDetail, setRecipeDetail } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);
  const [video, setVideo] = useState('');

  useEffect(() => {
    async function getDetails() {
      setLoading(true); // Start loading when fetching data
      const response = await fetch(`https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'bf588ab8f9msh2aebdcef094f1adp1bb55fjsnf088cbe6d2b5',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      });
      const data = await response.json();
      setVideo(data.renditions[0].url);
      setRecipeDetail(data);
      setLoading(false); // Stop loading after data is fetched
    }
    getDetails();
  }, [id, setRecipeDetail, setLoading]);

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="skeleton skeleton-image"></div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="skeleton skeleton-text skeleton-title"></div>
            <div className="skeleton skeleton-text skeleton-description"></div>
            <div className="skeleton skeleton-video"></div>
          </div>
        </div>
      ) : (
        <div className="row">
              <h3 className="text-center">{recipeDetail.name}</h3>
            <p className="text-muted text-center">{recipeDetail.description}</p>
        
          <div className="col-lg-6 col-md-12 text-center">
            <img className="detail-img" src={recipeDetail.thumbnail_url} alt="Recipe Thumbnail" />
          </div>
          <div className="col-lg-6 col-md-12 text-center">
            <div className="detail-img">
              <ReactPlayer url={video} controls={true} width="100%" height="100%" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        {!loading && <h1 className=''>Instructions</h1>}
        {!loading &&
          recipeDetail?.instructions?.map((step, index) => (
            <ul key={index}>
              <li>{step.display_text}</li>
            </ul>
          ))}
      </div>
    </div>
  );
}

export default Recipe;
