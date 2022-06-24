import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import MyContext from '../Context/MyContext';
// import { getFoodDetails } from '../Services/MealDB';
import '../Css/FoodDetails.css';

function FoodDetails() {
  const {
    setFoodDetails,
    foodDetails,
    copied,
    setCopied,
  } = useContext(MyContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const getDetails = async () => {
      const detailsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      console.log(detailsEndPoint);
      const result = await fetch(detailsEndPoint).then((response) => response.json());
      setFoodDetails(result.meals[0]);
    };
    getDetails();
  }, []);

  const copyText = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    // .then(() => console.log('Texto copiado com sucesso!'));
    setCopied(true);
    // .catch((err) => console.error('Falha ao copiar o texto:', err));
    // setCopied(false);
  };

  return (
    <div>
      {foodDetails && (
        <div>

          <img
            src={ `${foodDetails.strMealThumb}` }
            data-testid="recipe-photo"
            alt="recipeImage"
            width="100px"
            height="100px"
          />
          <h1 data-testid="recipe-title">
            {foodDetails.strMeal}
          </h1>
          {copied && <p>Link copied!</p>}
          <button
            onClick={ copyText }
            data-testid="share-btn"
            type="button"
          >
            Share
          </button>
          <button data-testid="favorite-btn" type="button">Favorite</button>
          <h2 data-testid="recipe-category">{ foodDetails.strCategory }</h2>
          <p data-testid={ `${foodDetails}-ingredient-name-and-measure` }>Ingredients</p>
          <p data-testid="instructions">
            { foodDetails.strInstructions }
          </p>
          <h1>Video</h1>
          <video
            src={ foodDetails.strVideo }
            data-testid="video"
          >
            <track kind="captions" />
          </video>
          <p data-testid={ `${foodDetails}-recomendation-card` }>Recommended</p>
          <Link to={ `/foods/${foodDetails.idMeal}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
            >
              Start Recipe

            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default FoodDetails;
