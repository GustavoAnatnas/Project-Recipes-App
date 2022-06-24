import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';
import IngredientsProgress from './IngredientsProgress';

function DrinksInProgress() {
  const { id } = useParams();

  const [drinksRecipes, setDrinksRecipes] = useState({});

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const drinksData = data.drinks[0];
      setDrinksRecipes(drinksData);
    };
    fetchDrinks();
  }, []);
  return (
    <div>
      <h2>DrinksInProgress</h2>
      <img
        src={ drinksRecipes.strDrinkThumb }
        alt={ `${drinksRecipes.strDrink}` }
        data-testid="recipe-photo"
        width="360"
        height="200"
      />
      <h1 data-testid="recipe-title">{drinksRecipes.strDrink}</h1>
      <h3 data-testid="recipe-category">{drinksRecipes.strAlcoholic}</h3>
      <button type="button">
        <img src={ shareIcon } alt="Share icon" data-testid="share-btn" />
      </button>
      <button type="button">
        <img src={ favIcon } alt="Fav icon" data-testid="favorite-btn" />
      </button>
      <h2>Ingredients</h2>
      <IngredientsProgress data={ drinksRecipes } />
      <h2>Instructions</h2>
      <p data-testid="instructions">{drinksRecipes.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default DrinksInProgress;
