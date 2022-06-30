import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '../Css/FavoriteCards.module.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import styles from '../Css/FavoriteRecipes.module.css';

const copy = require('clipboard-copy');

function FavoriteCards({ data, setNewData }) {
  const showLinkCopied = (index) => {
    document.getElementById(`${index}-link-copied`).style.display = 'inline';
    const timeout = 1500;
    setTimeout(() => {
      document.getElementById(`${index}-link-copied`).style.display = 'none';
    }, timeout);
  };

  const onShareButtonClick = (id, type, index) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    showLinkCopied(index);
  };

  const removeFavorite = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setNewData(newData);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  };

  const renderFoodCard = (item, index) => {
    const { image, name, category, nationality, id, type } = item;
    return (
      <div className={ styles.sectionFilter }>
        <div
          key={ name }
        >
          <Link to={ `/${type}s/${id}` }>
            <img
              src={ image }
              alt={ name }
              className={ styled.cardImg }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>
        <div className={ styles.sectionIcons }>
          <h6 data-testid={ `${index}-horizontal-top-text` }>
            {`${nationality} - ${category}`}
          </h6>
          <Link to={ `/${type}s/${id}` }>
            <h5 data-testid={ `${index}-horizontal-name` }>
              { name }
            </h5>
          </Link>
          <div className={ styles.sectionBodyIcons }>
            <button
              type="button"
              className={ styled.shareButton }
              onClick={ () => onShareButtonClick(id, type, index) }
            >
              <img
                src={ shareIcon }
                alt="share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

            <button
              type="button"
              className={ styled.favButton }
              onClick={ () => removeFavorite(id) }
            >
              <img
                src={ blackHeartIcon }
                alt="favorite button"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>

          <h6
            id={ `${index}-link-copied` }
            className={ styled.copiedLink }
          >
            Link copied!
          </h6>
        </div>
      </div>
    );
  };

  const renderDrinkCard = (item, index) => {
    const { image, name, alcoholicOrNot, id, type } = item;
    return (
      <div className={ styles.sectionFilter }>
        <div key={ name }>
          <Link to={ `/${type}s/${id}` }>
            <img
              src={ image }
              alt={ name }
              className={ styled.cardImg }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
        </div>
        <div className={ styles.sectionIcons }>
          <h6 data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</h6>
          <Link to={ `/${type}s/${id}` }>
            <h5 data-testid={ `${index}-horizontal-name` }>
              { name }
            </h5>
          </Link>
          <div className={ styles.sectionBodyIcons }>
            <button
              type="button"
              className={ styled.shareButton }
              onClick={ () => onShareButtonClick(id, type, index) }
            >
              <img
                src={ shareIcon }
                alt="share button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

            <button
              type="button"
              className={ styled.favButton }
              onClick={ () => removeFavorite(id) }
            >
              <img
                src={ blackHeartIcon }
                alt="favorite button"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>

          <h6
            id={ `${index}-link-copied` }
            className={ styled.copiedLink }
          >
            Link copied!
          </h6>
        </div>
      </div>
    );
  };

  return (
    <main>
      {data.map((item, index) => (
        item.type === 'food' ? renderFoodCard(item, index)
          : renderDrinkCard(item, index)
      ))}
    </main>
  );
}

FavoriteCards.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNewData: PropTypes.func.isRequired,
};

export default FavoriteCards;
