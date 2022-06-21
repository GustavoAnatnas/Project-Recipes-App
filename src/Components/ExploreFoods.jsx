import React, { useContext, useEffect } from 'react';
import FooterMenu from './FooterMenu';
import Header from './Header';

function ExploreFoods() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Explore Foods');
    setSearchHiden(false);
  }, []);

  return (
    <div>
      <Header />
      <FooterMenu />
    </div>
  );
}

export default ExploreFoods;
