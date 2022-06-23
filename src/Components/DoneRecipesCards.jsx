import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

function DoneRecipesCards({ finishedRecipes }) {
  console.log(finishedRecipes);
  return (
    <div>
      {
        finishedRecipes.map((item, index) => (
          <div key={ index }>
            <img
              src={ item.image }
              alt={ item.id }
              data-testid={ `${index}-horizontal-image` }
            />
            <h4 data-testid={ `${index}-horizontal-top-text` }>
              { item.category }
            </h4>
            <h3 data-testid={ `${index}-horizontal-name` }>
              { item.name }
            </h3>
            <h3 data-testid={ `${index}-horizontal-done-date` }>
              { item.doneDate }
            </h3>
            <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
              Share
            </button>
            <div>
              {
                item.tags.map((itemTag, indexTag) => (
                  <span
                    data-testid={ `${index}-${itemTag}-horizontal-tag` }
                    key={ indexTag }
                  >
                    { itemTag }
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}

DoneRecipesCards.propTypes = {
  finishedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DoneRecipesCards;
