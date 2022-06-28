import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';

function Explore() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    setHeaderTitle('Explore');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <div>
      <Header />
      <button
        data-testid="explore-foods"
        name="explore-foods"
        onClick={ () => history.push('/explore/foods') }
        type="button"
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        name="explore-drinks"
        onClick={ () => history.push('/explore/drinks') }
        type="button"
      >
        Explore Drinks
      </button>
      <FooterMenu />
    </div>
  );
}

export default Explore;
