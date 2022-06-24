import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneFoodCard({ item, index }) {
  return (
    <div>
      <div key={ index }>
        <img
          src={ item.image }
          alt={ item.id }
          data-testid={ `${index}-horizontal-image` }
        />
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { `${item.nationality} - ${item.category}` }
        </h4>
        <h3 data-testid={ `${index}-horizontal-name` }>
          { item.name }
        </h3>
        <h3 data-testid={ `${index}-horizontal-done-date` }>
          { item.doneDate }
        </h3>
        <button type="button">
          <img
            src={ shareIcon }
            alt="shareImg"
            data-testid={ `${index}-horizontal-share-btn` }
          />
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
    </div>
  );
}

DoneFoodCard.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneFoodCard;
