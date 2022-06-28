import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import IngredientsProgress from './IngredientsProgress';

function FoodsInProgress() {
  const history = useHistory();
  const [isDisabled, setIsDisable] = useState();
  const { id } = useParams();

  const [foodRecipes, setFoodRecipes] = useState({});
  const [copied, setCopied] = useState(false);
  const local = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const localRecipesDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [iconFav, setIconFav] = useState(local
    .some((item) => item.id === id) ? blackHeartIcon : favIcon);

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const foodData = data.meals[0];
      setFoodRecipes(foodData);
    };
    fetchFood();
  }, []);

  const copyText = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setCopied(true);
  };

  const favoriteFoods = () => {
    const { strMealThumb, strCategory, strArea, strMeal, idMeal } = foodRecipes;

    const newFoodFav = {
      id: idMeal,
      type: 'food',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };

    if (local.some((food) => food.id === idMeal)) {
      const filterFood = local.filter((meal) => meal.id !== idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify([filterFood]));
      setIconFav(favIcon);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, newFoodFav]));
      setIconFav(blackHeartIcon);
    }
  };

  const directRecipe = () => {
    const { strMealThumb, strCategory, strArea, strMeal, idMeal, strTags } = foodRecipes;

    const splitedTags = strTags !== null && strTags.split(',');

    const data = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

    const objFoodsDoneRecipes = {
      id: idMeal,
      type: 'food',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: data.toLocaleString('pt-BR', options),
      tags: splitedTags || [],
    };

    if (!localRecipesDone.some((food) => food.id === idMeal)) {
      localStorage.setItem('doneRecipes', JSON.stringify([
        ...localRecipesDone, objFoodsDoneRecipes]));
    }

    history.push('/done-recipes');
  };

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
      <button
        type="button"
        onClick={ copyText }
      >
        <img src={ shareIcon } alt="Share icon" data-testid="share-btn" />
      </button>
      <button
        type="button"
        onClick={ favoriteFoods }
      >
        <img src={ iconFav } alt="Fav icon" data-testid="favorite-btn" />
      </button>
      {copied && <span>Link copied!</span>}
      <h2>Ingredients</h2>
      <IngredientsProgress
        data={ foodRecipes }
        setBtnStatus={ setIsDisable }
        type="meals"
      />
      <h2>Instructions</h2>
      <p data-testid="instructions">{foodRecipes.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ directRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default FoodsInProgress;
