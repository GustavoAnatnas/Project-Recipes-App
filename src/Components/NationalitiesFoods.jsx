import React, { useContext, useEffect } from 'react';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';

function NationalitiesFoods() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Explore Nationalities');
    setSearchHiden(true);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <div>
      <Header />
      <FooterMenu />
    </div>
  );
}

export default NationalitiesFoods;
