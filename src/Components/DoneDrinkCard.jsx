import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import styles from '../Css/DoneRecipes.module.css';

function DoneDrinkCard({ item, index }) {
  return (
    <div>
      <div
        className={ styles.sectionFilter }
        key={ index }
      >
        <Link
          to={ `/drinks/${item.id}` }
        >
          <img
            src={ item.image }
            alt={ item.id }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { `${item.category} - ${item.alcoholicOrNot}` }
        </h4>
        <Link
          to={ `/drinks/${item.id}` }
        >
          <h3 data-testid={ `${index}-horizontal-name` }>
            { item.name }
          </h3>
        </Link>
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

DoneDrinkCard.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneDrinkCard;
