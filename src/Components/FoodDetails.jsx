import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../Context/MyContext';

import '../Css/FoodDetails.css';

function FoodDetails() {
  const {
    setFoodDetails,
    foodDetails,
    copied,
    setCopied,
    setIngredients,
    ingredients,
    setMeasure,
    measure,
    favorite,
    setFavorite,
  } = useContext(MyContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const getFromLocalStorage = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    return favoriteRecipes ? JSON.parse(favoriteRecipes) : '';
  };

  useEffect(() => {
    const getDetails = async () => {
      const detailsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      console.log(detailsEndPoint);
      const result = await fetch(detailsEndPoint).then((response) => response.json());
      setFoodDetails(result.meals[0]);
    };
    getDetails();
    const checkIfIsFavorite = () => {
      const getFromLocalStorag = getFromLocalStorage();
      console.log(getFromLocalStorag);
      if (getFromLocalStorag) {
        const isFavorite = getFromLocalStorag
          .some((recipe) => recipe.id === pathname.split('/')[2]);
        return isFavorite;
      }
    };
    setFavorite(checkIfIsFavorite());
  }, []);

  useEffect(() => {
    const getingredients = () => {
      const getIngredients = Object.entries(foodDetails)
        .filter((ingredientes) => ingredientes[0]
          .includes('strIngredient')).filter((ingredientes) => ingredientes[1] !== '')
        .map((ingredientes) => ingredientes[1]);
      return setIngredients(getIngredients);
    };
    const setmeasure = () => {
      const getMeasure = Object.entries(foodDetails)
        .filter((measures) => measures[0]
          .includes('strMeasure')).filter((measures) => measures[1] !== '')
        .map((measures) => measures[1]);
      return setMeasure(getMeasure);
    };
    getingredients();
    setmeasure();
  }, [foodDetails, setIngredients, setMeasure]);

  const favoriteFood = () => {
    const obj = [
      {
        id: foodDetails.idMeal,
        type: 'food',
        nationality: foodDetails.strArea,
        category: foodDetails.strCategory,
        alcoholicOrNot: '',
        name: foodDetails.strMeal,
        image: foodDetails.strMealThumb,
      },
    ];
    setFavorite(!favorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopied(true);
    // .then(() => console.log('Texto copiado com sucesso!'));
    // .catch((err) => console.error('Falha ao copiar o texto:', err));
    // setCopied(false);
  };

  return (
    <div>
      {foodDetails && (
        <div>
          <h1 data-testid="recipe-title">
            {foodDetails.strMeal}
          </h1>
          <img
            src={ `${foodDetails.strMealThumb}` }
            data-testid="recipe-photo"
            alt={ foodDetails.strMeal }
            width="100px"
            height="100px"
          />
          {copied && <p>Link copied!</p>}
          <button
            onClick={ copyText }
            data-testid="share-btn"
            type="button"
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <button
            onClick={ favoriteFood }
            type="button"
          >
            <img
              data-testid="favorite-btn"
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="heart"
            />
          </button>
          <h2 data-testid="recipe-category">{ foodDetails.strCategory }</h2>
          <ul>
            {ingredients && ingredients.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient} - ${measure[index]}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">
            { foodDetails.strInstructions }
          </p>
          <h2>Video</h2>
          <div className="video-responsive">
            <iframe
              data-testid="video"
              src={ (foodDetails.strYoutube
                ? foodDetails.strYoutube.replace('watch?v=', 'embed/') : '') }
              title="video"
              width="360"
              height="340"
              frameBorder="0"
            />
          </div>
          {/* <p>{ foodDetails.strYoutube.replace('watch?v=', 'embed/') }</p> */}
          <p data-testid="0-recomendation-card">Recommended</p>
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
