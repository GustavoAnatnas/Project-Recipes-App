import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Css/DoneRecipes.module.css';

function DoneRecipesFilter({ setFinishedRecipeFilter }) {
  const handleClick = (type) => { // type: 'food', 'drink' ou 'all'
    setFinishedRecipeFilter(type);
  };

  return (
    <aside className={ styles.section }>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleClick('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleClick('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleClick('drink') }
      >
        Drinks
      </button>
    </aside>
  );
}

DoneRecipesFilter.propTypes = {
  setFinishedRecipeFilter: PropTypes.func.isRequired,
};

export default DoneRecipesFilter;
