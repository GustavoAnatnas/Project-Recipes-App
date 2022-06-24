import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import MyContext from '../Context/MyContext';
// import RecipeDetails from './RecipeDetalis';

function DrinkDetails() {
  const {
    setDrinkDetails,
    drinkDetails,
    copied,
    setCopied,
  } = useContext(MyContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const getDetails = async () => {
      const detailsEndPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`;
      console.log(detailsEndPoint);
      const result = await fetch(detailsEndPoint).then((response) => response.json());
      setDrinkDetails(result.drinks[0]);
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
      {drinkDetails && (
        <div>

          <img
            src={ `${drinkDetails.strDrinkThumb}` }
            data-testid="recipe-photo"
            alt="recipeImage"
            width="100px"
            height="100px"
          />
          <h1 data-testid="recipe-title">
            {drinkDetails.strDrink}
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
          <h2 data-testid="recipe-category">{ drinkDetails.strCategory }</h2>
          <p data-testid={ `${drinkDetails}-ingredient-name-and-measure` }>Ingredients</p>
          <p data-testid="instructions">
            { drinkDetails.strInstructions }
          </p>
          <h1>Video</h1>
          <video
            src={ drinkDetails.strVideo }
            data-testid="video"
          >
            <track kind="captions" />
          </video>
          <p data-testid={ `${drinkDetails}-recomendation-card` }>Recommended</p>
          <Link to={ `/drinks/${drinkDetails.idDrink}/in-progress` }>
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

export default DrinkDetails;
