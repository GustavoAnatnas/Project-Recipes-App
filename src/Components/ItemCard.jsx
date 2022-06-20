import React from 'react';
import PropTypes from 'prop-types';
import styled from '../Css/TelaPrincipal.module.css';

function ItemCard({ data, type }) {
  const recipeGap = 12;
  const filteredItems = data.slice(0, recipeGap);

  return (
    <section>
      { filteredItems.map((item, index) => (
        <div
          key={ item[`id${type}`] }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ item[`str${type}Thumb`] }
            alt={ item[`str${type}`] }
            data-testid={ `${index}-card-img` }
            className={ styled.thumb }
          />
          <h4
            data-testid={ `${index}-card-name` }
          >
            { item[`str${type}`] }
          </h4>
        </div>
      ))}
    </section>
  );
}

ItemCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemCard;
