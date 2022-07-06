import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';

import styles from '../Css/Ingredients.module.css';

function IngredientsDrinks() {
  const { setHeaderTitle, setSearchHiden,
    getDrinkIngredientsRecipes, drinkIngredients } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    setHeaderTitle('Explore Ingredients');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  const handleclick = (ingredient) => {
    getDrinkIngredientsRecipes(ingredient);
    history.push('/drinks');
  };

  return (
    <>
      <Header />
      <div className={ styles.ingredientsFather }>
        {drinkIngredients.map(({ strIngredient1 }, index) => (
          <button
            type="button"
            key={ index }
            name={ strIngredient1 }
            onClick={ () => handleclick(strIngredient1) }
            data-testid={ `${index}-ingredient-card` }
            className={ styles.ingredientsCard }
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
