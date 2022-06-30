import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';

import '../Css/Ingredients.css';

function IngredientsDrinks() {
  const { setHeaderTitle, setSearchHiden,
    getDrinkIngredientsRecipes, drinkIngredients } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    setHeaderTitle('Explore Ingredients');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  const handleclick = (ingredient) => {
    console.log(ingredient);
    getDrinkIngredientsRecipes(ingredient);
    history.push('/drinks');
  };

  return (
    <>
      <Header />
      <div className="ingredients-father">
        {drinkIngredients.map(({ strIngredient1 }, index) => (
          <button
            type="button"
            key={ index }
            name={ strIngredient1 }
            onClick={ () => handleclick(strIngredient1) }
            data-testid={ `${index}-ingredient-card` }
            className="ingredients-card"
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
              alt={ strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              {strIngredient1}
            </h3>
          </button>
        ))}
        <FooterMenu />
      </div>
    </>
  );
}

export default IngredientsDrinks;
