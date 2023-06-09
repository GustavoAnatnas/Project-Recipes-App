import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';

import styles from '../Css/Ingredients.module.css';

function IngredientsFoods() {
  const { setHeaderTitle, setSearchHiden,
    foodIngredients, getFoodIngredientsRecipes } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    setHeaderTitle('Explore Ingredients');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  const handleclick = (ingredient) => {
    console.log(ingredient);
    getFoodIngredientsRecipes(ingredient);
    history.push('/foods');
  };

  return (
    <>
      <Header />
      <div className={ styles.ingredientsFather }>
        {foodIngredients.map(({ strIngredient }, index) => (
          <button
            type="button"
            key={ index }
            name={ strIngredient }
            onClick={ () => handleclick(strIngredient) }
            data-testid={ `${index}-ingredient-card` }
            className={ styles.ingredientsCard }
          >
            <img
              src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
              alt={ strIngredient }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              {strIngredient}
            </h3>
          </button>
        ))}
        <FooterMenu />
      </div>
    </>
  );
}

export default IngredientsFoods;
