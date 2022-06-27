import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import styles from '../Css/IngredientChecked.module.css';

function IngredientsProgress({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const type = pathname.includes('foods') ? 'meals' : 'cocktails';

  const [ingredientChecked, setIngredientChecked] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(local);
    if (local !== null && (local[type]) !== undefined && local[type][id] !== undefined) {
      setIngredientChecked(local[type][id]);
    }
    // (local[type][id] ? setIngredientChecked(local[type][id]) : '');

    // setIngredientChecked(local[type][id]);
    // console.log(type, id);
  }, []);

  const localChange = (name) => {
    console.log(name);
    console.log(data);
    console.log(id);
    console.log(pathname);
    console.log(type);
    // console.log(localStg);
    // const localStg = JSON.parse(localStorage
    //   .getItem('inProgressRecipes'))[type][id] || [];
    // const names = [name];
    const newName = {
      [type]: { [id]: [...ingredientChecked, name] } };

    return localStorage.setItem('inProgressRecipes', JSON.stringify(newName));

    // if (!local[type][id]) {
    //   setInProgressItems([name]);
    //   return localStorage.setItem('inProgressRecipes', JSON.stringify(newName));
    // }
  };

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
  data: PropTypes.string,
}.isRequired;

export default IngredientsProgress;
