import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '../Css/TelaPrincipal.module.css';
import MyContext from '../Context/MyContext';

function ItemCard({ data, type }) {
  const { filteredData } = useContext(MyContext);
  const recipeGap = 12;
  const filteredItems = (filteredData || data).slice(0, recipeGap);
  return (
    <section>
      { filteredItems.map((item, index) => (
        <Link
          key={ item[`id${type}`] }
          to={ (
            type === 'Meal'
              ? `/foods/${item[`id${type}`]}` : `/drinks/${item[`id${type}`]}`
          ) }
        >
          <div
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
        </Link>
      ))}
    </section>
  );
}

ItemCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemCard;
