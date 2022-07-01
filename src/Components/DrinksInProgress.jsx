import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import IngredientsProgress from './IngredientsProgress';
import styled from '../Css/DrinksInProgress.module.css';

function DrinksInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [isDisabled, setIsDisable] = useState();
  const [drinksRecipes, setDrinksRecipes] = useState({});
  const [copied, setCopied] = useState(false);
  const localRecipesDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const local = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [iconFav, setIconFav] = useState(local
    .some((item) => item.id === id) ? blackHeartIcon : favIcon);

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      const drinksData = data.drinks[0];
      console.log(drinksData);
      setDrinksRecipes(drinksData);
    };
    fetchDrinks();
  }, []);

  const copyText = async () => {
    await navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
    setCopied(true);
  };

  const favoriteDrinks = () => {
    console.log('favoritei');
    const { strDrinkThumb, strCategory, strDrink, idDrink,
      strAlcoholic } = drinksRecipes;

    const newDrinksFav = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    if (local.some((drink) => drink.id === idDrink)) {
      const filterDrinks = local.filter((cocktails) => cocktails.id !== idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify([filterDrinks]));
      setIconFav(favIcon);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, newDrinksFav]));
      setIconFav(blackHeartIcon);
    }
  };

  const directRecipe = () => {
    const {
      strDrinkThumb,
      strCategory,
      strArea,
      strDrink,
      idDrink,
      strTags,
      alcoholicOrNot } = drinksRecipes;

    const splitedTags = strTags !== null && strTags.split(',');

    const data = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

    const objDrinksDoneRecipes = {
      id: idDrink,
      type: 'food',
      nationality: strArea || '',
      category: strCategory || '',
      alcoholicOrNot,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: data.toLocaleString('pt-BR', options),
      tags: splitedTags || [],
    };

    if (!localRecipesDone.some((drink) => drink.id === idDrink)) {
      localStorage.setItem('doneRecipes', JSON.stringify([
        ...localRecipesDone, objDrinksDoneRecipes]));
    }

    history.push('/done-recipes');
  };

  return (
    <div className={ styled.drinkInProgressPage }>
      {/* <h2>DrinksInProgress</h2> */}
      <img
        className={ styled.mainImage }
        src={ drinksRecipes.strDrinkThumb }
        alt={ `${drinksRecipes.strDrink}` }
        data-testid="recipe-photo"
        // width="360"
        // height="200"
      />
      <div className={ styled.headFood }>
        <h1 data-testid="recipe-title">{drinksRecipes.strDrink}</h1>
        <button
          className={ styled.auxBtns }
          type="button"
          onClick={ copyText }
        >
          <img src={ shareIcon } alt="Share icon" data-testid="share-btn" />
        </button>
        <button
          className={ styled.auxBtns }
          type="button"
          onClick={ favoriteDrinks }
        >
          <img src={ iconFav } alt="Fav icon" data-testid="favorite-btn" />
        </button>
      </div>
      {copied && <span>Link copied!</span>}
      <h3 data-testid="recipe-category">{drinksRecipes.strAlcoholic}</h3>
      <h2>Ingredients</h2>
      <IngredientsProgress
        data={ drinksRecipes }
        type="cocktails"
        setBtnStatus={ setIsDisable }
      />
      <h2>Instructions</h2>
      <p
        className={ styled.fdInstructions }
        data-testid="instructions"
      >
        {drinksRecipes.strInstructions}
      </p>
      <button
        className={ styled.btnFinished }
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

export default DrinksInProgress;
