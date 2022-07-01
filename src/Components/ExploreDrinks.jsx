import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import MyContext from '../Context/MyContext';
import Header from './Header';

import styles from '../Css/ExploreDrinksFoods.module.css';

function ExploreDrinks() {
  const { setHeaderTitle, setSearchHiden,
    getRandomId, randomDrinkId } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    setHeaderTitle('Explore Drinks');
    setSearchHiden(false);
    getRandomId();
  }, [setHeaderTitle, setSearchHiden, getRandomId]);

  return (
    <>
      <Header />
      <div className={ styles.container }>
        <button
          className={ styles.btnExploreDF }
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
          type="button"
        >
          By Ingredient
        </button>
        <button
          className={ styles.btnExploreDF }
          data-testid="explore-surprise"
          onClick={ () => history.push(`/drinks/${randomDrinkId}`) }
          type="button"
        >
          Surprise me!
        </button>
        <FooterMenu />
      </div>
    </>
  );
}

export default ExploreDrinks;
