import React, { useContext, useEffect } from 'react';
import FooterMenu from './FooterMenu';
import MyContext from '../Context/MyContext';
import Header from './Header';

function ExploreDrinks() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Explore Drinks');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <div>
      <Header />
      <FooterMenu />
    </div>
  );
}

export default ExploreDrinks;
