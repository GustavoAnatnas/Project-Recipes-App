import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../Css/IngredientChecked.module.css';

function IngredientsProgress({ data }) {
  const [ingredientChecked, setIngredientChecked] = useState([]);

  const saveIngredients = (name) => {
    if (ingredientChecked.includes(name)) {
      setIngredientChecked(ingredientChecked.filter((item) => item !== name));
    } else {
      setIngredientChecked([...ingredientChecked, name]);
    }
  };

  const ingredients = Object.values(Object.fromEntries(Object.entries(data)
    .filter(([key, value]) => key.includes('strIngredient')
  && value)));

  const measures = Object.values(Object.fromEntries(Object.entries(data)
    .filter(([key, value]) => key.includes('strMeasure')
    && value && value !== ' ')));

  return (
    <div>
      {measures.map((measure, index) => (
        <div
          key={ `${ingredients[index]} - ${index}` }
        >
          <label
            htmlFor={ ingredients[index] }
            data-testid={ `${index}-ingredient-step` }
            className={ ingredientChecked.includes(ingredients[index]) === true
              && styles.ingredients }
          >
            <input
              type="checkbox"
              id={ ingredients[index] }
              onClick={ () => saveIngredients(ingredients[index]) }
            />
            {`${ingredients[index]} - ${measure}`}
          </label>
        </div>
      ))}
    </div>
  );
}

IngredientsProgress.propTypes = {
  data: PropTypes.string,
}.isRequired;

export default IngredientsProgress;
