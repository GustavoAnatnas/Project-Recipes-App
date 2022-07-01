import React from 'react';
import PropTypes from 'prop-types';
import DoneFoodCard from './DoneFoodCard';
import DoneDrinkCard from './DoneDrinkCard';
// import styles from '../Css/DoneRecipes.module.css';

function DoneRecipesCards({ finishedRecipes }) {
  return (
    <div>
      {
        finishedRecipes.map((item, index) => (
          item.type === 'food'
            ? (
              <DoneFoodCard key={ index } item={ item } index={ index } />
            )
            : <DoneDrinkCard key={ index } item={ item } index={ index } />
        ))
      }
    </div>
  );
}

DoneRecipesCards.propTypes = {
  finishedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DoneRecipesCards;
