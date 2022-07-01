import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from '../Css/IngredientChecked.module.css';
import styled from '../Css/IngredientsProgress.module.css';

function IngredientsProgress({ data, setBtnStatus, type }) {
  const { id } = useParams();

  const local = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  const [ingredientChecked, setIngredientChecked] = useState([]);

  const ingredients = Object.values(Object.fromEntries(Object.entries(data)
    .filter(([key, value]) => key.includes('strIngredient')
&& value)));

  useEffect(() => {
    if (ingredients.length === ingredientChecked.length) {
      return setBtnStatus(false);
    }
    setBtnStatus(true);
  }, [ingredients, local]);

  useEffect(() => {
    if (local !== null && (local[type]) !== undefined) {
      setIngredientChecked(local[type][id]);
    }
  }, []);

  const localChange = (name) => {
    const newName = {
      [type]: { [id]: [...ingredientChecked, name] },
    };

    if (ingredientChecked.includes(name)) {
      const filterCheck = ingredientChecked.filter((ingr) => ingr !== name);
      setIngredientChecked(filterCheck);
      const newItems = {
        [type]: { [id]: filterCheck },
      };
      return localStorage.setItem('inProgressRecipes', JSON.stringify(newItems));
    }

    return localStorage.setItem('inProgressRecipes', JSON.stringify(newName));
  };

  const saveIngredients = (name) => {
    if (ingredientChecked.includes(name)) {
      setIngredientChecked(ingredientChecked.filter((item) => item !== name));
    } else {
      setIngredientChecked([...ingredientChecked, name]);
    }
  };

  const measures = Object.values(Object.fromEntries(Object.entries(data)
    .filter(([key, value]) => key.includes('strMeasure')
    && value && value !== ' ')));

  return (
    <div className={ styled.checkElements }>
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
              checked={ ingredientChecked.includes(ingredients[index]) }
              onChange={ () => localChange(ingredients[index]) }
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
  data: PropTypes.arrayOf(),
  setBtnStatus: PropTypes.func,
  type: PropTypes.string,
}.isRequired;

export default IngredientsProgress;
