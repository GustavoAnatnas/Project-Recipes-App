import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import styled from '../Css/TelaPrincipal.module.css';
import styles from '../Css/DoneRecipes.module.css';

function DoneFoodCard({ item, index }) {
  const [showMessage, setShowMessage] = useState(false);

  const showMessageCopy = (id) => {
    clipboardCopy(`http://localhost:3000/foods/${id}`);
    setShowMessage(true);
  };

  return (
    <div
      className={ styles.sectionFilter }
      key={ index }
    >
      <Link
        to={ `/foods/${item.id}` }
      >
        <img
          src={ item.image }
          alt={ item.id }
          data-testid={ `${index}-horizontal-image` }
          className={ styled.thumb }
        />
      </Link>
      <section>
        <div className={ styles.share }>
          <h4 data-testid={ `${index}-horizontal-top-text` }>
            { `${item.nationality} - ${item.category}` }
          </h4>
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
          <button
            onClick={ () => showMessageCopy(item.id) }
            id="shareButton"
            type="button"
          >
            <img
              src={ shareIcon }
              alt="shareImg"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
        </div>
        <div className={ styles.linkName }>
          <Link
            to={ `/foods/${item.id}` }
          >
            <h3 data-testid={ `${index}-horizontal-name` }>
              { item.name }
            </h3>
          </Link>
          <h3 data-testid={ `${index}-horizontal-done-date` }>
            { item.doneDate }
          </h3>
          {
            showMessage
              ? (
                <span>Link copied!</span>
              )
              : null
          }
        </div>
      </section>
    </div>
  );
}

DoneFoodCard.propTypes = {
  item: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneFoodCard;
