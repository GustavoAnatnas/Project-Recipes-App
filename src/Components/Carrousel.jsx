import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Css/Carousel.css';

function DrinkCarousel({ recomendedDrinks }) {
  const history = useHistory();
  return (
    <div className="carousel">
      {recomendedDrinks && recomendedDrinks.map((drink, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${index}-recomendation-card` }
          onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
        >

          <img
            alt={ drink.strDrink }
            src={ drink.strDrinkThumb }
            width="50px"
          />

          <p>
            {drink.strCategory}
            {' '}
            -
            {' '}
            { drink.strAlcoholic }
          </p>
          <p>
            {' '}

          </p>
          <h3
            data-testid={ `${index}-recomendation-title` }
          >
            { drink.strDrink }
          </h3>

        </button>

      ))}
    </div>
  );
}

DrinkCarousel.propTypes = {
  recomendedDrinks: PropTypes.arrayOf,
}.isRequired;

export default DrinkCarousel;
