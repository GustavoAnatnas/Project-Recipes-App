import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';
import styles from '../Css/Explore.module.css';

function Explore() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    setHeaderTitle('Explore');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <>
      <Header />
      <div className={ styles.container }>
        <button
          data-testid="explore-foods"
          name="explore-foods"
          onClick={ () => history.push('/explore/foods') }
          type="button"
          className={ styles.btnExplore }
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          name="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
          type="button"
          className={ styles.btnExplore }
        >
          Explore Drinks
        </button>
        <FooterMenu />
      </div>
    </>
  );
}

export default Explore;
