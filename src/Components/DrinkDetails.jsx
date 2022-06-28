import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import noHeart from '../images/whiteHeartIcon.svg';
import heart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import MyContext from '../Context/MyContext';

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
    favorite,
    setFavorite,
    doneRecipes,
    setDoneRecipes,
  } = useContext(MyContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const getFromLocalStorage = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    return favoriteRecipes ? JSON.parse(favoriteRecipes) : '';
  };

  useEffect(() => {
    const getDetails = async () => {
      const detailsEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      console.log(detailsEndPoint);
      const result = await fetch(detailsEndPoint).then((response) => response.json());
      setDrinkDetails(result.drinks[0]);
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
    // .then(() => console.log('Texto copiado com sucesso!'));
    setCopied(true);
    // .catch((err) => console.error('Falha ao copiar o texto:', err));
    // setCopied(false);
  };

  const getDoneFromLocal = () => {
    const doneRecips = localStorage.getItem('doneRecipes');
    return doneRecips ? JSON.parse(doneRecips) : '';
  };
  useEffect(() => {
    const verifyIfIsDone = () => {
      const getLocalDone = getDoneFromLocal();
      console.log(getLocalDone);
      const recipeIsDone = getLocalDone
        .some((recipe) => recipe.id === drinkDetails.idDrink);
      console.log(recipeIsDone);
      setDoneRecipes(recipeIsDone);
    };
    verifyIfIsDone();
  }, []);

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
          <p data-testid="0-recomendation-card">Recommended</p>
          {doneRecipes && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
              onClick={ () => history
                .push(`/drinks/${drinkDetails.idDrink}/in-progress`) }
            >
              Start Recipe

            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DrinkDetails;
