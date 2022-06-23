import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';

function ExploreFoods() {
  const { setHeaderTitle, setSearchHiden,
    getRandomId, randomFoodId } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    setHeaderTitle('Explore Foods');
    setSearchHiden(false);
    getRandomId();
  }, [setHeaderTitle, setSearchHiden, getRandomId]);

  return (
    <div>
      <Header />
      <button
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
        type="button"
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
        type="button"
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        onClick={ () => history.push(`/foods/${randomFoodId}`) }
        type="button"
      >
        Surprise me!
      </button>
      <FooterMenu />
    </div>
  );
}

export default ExploreFoods;
