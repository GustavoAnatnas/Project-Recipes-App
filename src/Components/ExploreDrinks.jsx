import React, { useContext, useEffect } from 'react';
import FooterMenu from './FooterMenu';

function ExploreDrinks() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Explore Drinks');
    setSearchHiden(false);
  }, []);

  return (
    <div>
      <h2>ExploreDrinks</h2>
      <FooterMenu />
    </div>
  );
}

export default ExploreDrinks;
