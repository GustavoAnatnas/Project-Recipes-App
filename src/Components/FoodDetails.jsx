import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  } = useContext(MyContext);
  const [favorite, setFavorite] = useState(false);
  // const [startedRecipes, setStartedRecipes] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;

  const getDataFromLocalStorage = (key) => {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : '';
  };

  useEffect(() => {
    const getDetails = async () => {
      const detailsEndPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      const result = await fetch(detailsEndPoint).then((response) => response.json());
      setFoodDetails(result.meals[0]);
    };
    getDetails();
    const checkIfIsFavorite = () => {
      const getFromLocalStorag = getDataFromLocalStorage('favoriteRecipes');
      if (getFromLocalStorag) {
        const isFavorite = getFromLocalStorag
          .some((recipe) => recipe.id === pathname.split('/')[2]);
        return isFavorite;
      }
    };
    setFavorite(checkIfIsFavorite());
  }, []);

  useEffect(() => {
    const filterIngredients = () => {
      const getIngredients = Object.entries(foodDetails)
        .filter((ingredientes) => ingredientes[0]
          .includes('strIngredient')).filter((ingredientes) => ingredientes[1] !== '')
        .map((ingredientes) => ingredientes[1]);
      return setIngredients(getIngredients);
    };
    const filterMeasure = () => {
      const getMeasure = Object.entries(foodDetails)
        .filter((measures) => measures[0]
          .includes('strMeasure')).filter((measures) => measures[1] !== '')
        .map((measures) => measures[1]);
      return setMeasure(getMeasure);
    };
    filterIngredients();
    filterMeasure();
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
  };

  useEffect(() => {
    const verifyIfIsDone = () => {
      const getLocalDone = getDataFromLocalStorage('doneRecipes');
      const doneRecipesIds = [];
      if (getLocalDone !== '') {
        getLocalDone.map((item) => doneRecipesIds.push(item.id));
        setDoneRecipes(doneRecipesIds.includes(foodDetails.idMeal));
      }
      // const recipeIsDone = getLocalDone.filter(({ id }) => id === foodDetails.idMeal);
      // console.log(recipeIsDone);
    };
    verifyIfIsDone();
  }, []);

  // useEffect(() => {
  //   const verifyIfIsInProgress = () => {
  //     const getInProgress = getDataFromLocalStorage('inProgressRecipes');
  //     // console.log(getInProgress);
  //     const recipeIsInProgress = Object.keys(getInProgress.meals)
  //       .includes(foodDetails.idMeal);
  //     // console.log(recipeIsInProgress);
  //     setStartedRecipes(recipeIsInProgress);
  //   };
  //   verifyIfIsInProgress();
  // }, []);

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
          <p data-testid="0-recomendation-card">Recommended</p>
          { !doneRecipes && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => history.push(`/foods/${foodDetails.idMeal}/in-progress`) }
            >
              { startedRecipes ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FoodDetails;
