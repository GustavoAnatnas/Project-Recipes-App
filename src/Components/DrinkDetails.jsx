import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import noHeart from '../images/whiteHeartIcon.svg';
import heart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../Context/MyContext';

import '../Css/Carousel.css';

function DrinkDetails() {
  const {
    setDrinkDetails,
    drinkDetails,
    copied,
    setCopied,
    setIngredients,
    ingredients,
    setMeasure,
    measure,
    doneRecipes,
    startedRecipes,
    verifyLocalStorage,
    recomendedFoods,
  } = useContext(MyContext);
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams;

  const history = useHistory();
  const { location: { pathname } } = history;

  const getDataFromLocalStorage = (key) => {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : '';
  };

  useEffect(() => {
    const getDetails = async () => {
      const detailsEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      const result = await fetch(detailsEndPoint).then((response) => response.json());
      setDrinkDetails(result.drinks[0]);
    };
    const checkIfIsFavorite = () => {
      const getFromLocalStorag = getDataFromLocalStorage('favoriteRecipes');
      if (getFromLocalStorag) {
        const isFavorite = getFromLocalStorag
          .some((recipe) => recipe.id === pathname.split('/')[2]);
        return isFavorite;
      }
    };
    getDetails();
    setFavorite(checkIfIsFavorite());
    verifyLocalStorage(id, 'drinks');
  }, []);

  useEffect(() => {
    const getingredients = () => {
      const getIngredients = Object.entries(drinkDetails)
        .filter((ingredientes) => ingredientes[0]
          .includes('strIngredient')).filter((ingredientes) => ingredientes[1] !== null)
        .map((ingredientes) => ingredientes[1]);
      return setIngredients(getIngredients);
    };
    const setmeasure = () => {
      const getMeasure = Object.entries(drinkDetails)
        .filter((measures) => measures[0]
          .includes('strMeasure')).filter((measures) => measures[1] !== null)
        .map((measures) => measures[1]);
      return setMeasure(getMeasure);
    };
    getingredients();
    setmeasure();
  }, [drinkDetails, setIngredients, setMeasure]);

  const favoriteDrink = () => {
    const obj = [
      {
        id: drinkDetails.idDrink,
        type: 'drink',
        nationality: '',
        category: drinkDetails.strCategory,
        alcoholicOrNot: drinkDetails.strAlcoholic,
        name: drinkDetails.strDrink,
        image: drinkDetails.strDrinkThumb,
      },
    ];
    setFavorite(!favorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopied(true);
  };

  return (
    <div>
      {drinkDetails && (
        <div>
          <h1 data-testid="recipe-title">
            {drinkDetails.strDrink}
          </h1>
          <img
            src={ `${drinkDetails.strDrinkThumb}` }
            data-testid="recipe-photo"
            alt={ drinkDetails.strMeal }
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
            onClick={ favoriteDrink }
            type="button"
          >
            <img
              data-testid="favorite-btn"
              src={ favorite ? heart : noHeart }
              alt="heart"
            />
          </button>
          <h2 data-testid="recipe-category">

            { drinkDetails.strCategory }
            {' '}
            -
            {' '}
            {drinkDetails.strAlcoholic}

          </h2>
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
            { drinkDetails.strInstructions }
          </p>
          <div className="carousel">
            {recomendedFoods && recomendedFoods.map((food, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                onClick={ () => history.push(`/foods/${food.idMeal}`) }
              >
                <img
                  alt={ food.strMeal }
                  src={ food.strMealThumb }
                  width="50px"
                />
                <p>{food.strCategory}</p>
                <h3
                  data-testid={ `${index}-recomendation-title` }
                >
                  { food.strMeal }
                </h3>

              </button>

            ))}
          </div>
          { !doneRecipes && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => history
                .push(`/drinks/${drinkDetails.idDrink}/in-progress`) }
            >
              { !startedRecipes ? 'Continue Recipe' : 'Start Recipe'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DrinkDetails;
