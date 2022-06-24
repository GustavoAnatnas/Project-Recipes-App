import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';
import IngredientsProgress from './IngredientsProgress';

function FoodsInProgress() {
  const { id } = useParams();

  const [foodRecipes, setFoodRecipes] = useState({});

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const foodData = data.meals[0];
      setFoodRecipes(foodData);
    };
    fetchFood();
  }, []);

  return (
    <div>
      <h2>FoodsInProgress</h2>

      <img
        src={ foodRecipes.strMealThumb }
        alt={ `${foodRecipes.strMeal}` }
        data-testid="recipe-photo"
        width="360"
        height="200"
      />
      <h1 data-testid="recipe-title">{foodRecipes.strMeal}</h1>
      <h3 data-testid="recipe-category">{foodRecipes.strCategory}</h3>
      <button type="button">
        <img src={ shareIcon } alt="Share icon" data-testid="share-btn" />
      </button>
      <button type="button">
        <img src={ favIcon } alt="Fav icon" data-testid="favorite-btn" />
      </button>
      <h2>Ingredients</h2>
      <IngredientsProgress data={ foodRecipes } />
      <h2>Instructions</h2>
      <p data-testid="instructions">{foodRecipes.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default FoodsInProgress;
