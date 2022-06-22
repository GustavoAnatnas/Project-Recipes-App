import React, { useContext, useEffect } from 'react';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';

function Explore() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Explore');
    setSearchHiden(false);
  }, []);

  return (
    <div>
      <Header />
      <FooterMenu />
    </div>
  );
}

export default Explore;
