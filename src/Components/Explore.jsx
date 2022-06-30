import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';
import '../Css/Explore.css';

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
      <div className="container">
        <button
          data-testid="explore-foods"
          name="explore-foods"
          onClick={ () => history.push('/explore/foods') }
          type="button"
          className="btn-explore"
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          name="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
          type="button"
          className="btn-explore"
        >
          Explore Drinks
        </button>
        <FooterMenu />
      </div>
    </>
  );
}

export default Explore;
