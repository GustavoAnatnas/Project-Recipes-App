import React, { useContext, useEffect } from 'react';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';
import FooterMenu from './FooterMenu';
import Header from './Header';

function Foods() {
  const { foodData, foodCategories,
    setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Foods');
    setSearchHiden(true);
  }, []);

  return (
    <>
      <Header />
      <Categories data={ foodCategories } type="Meal" />
      <ItemCard data={ foodData } type="Meal" />
      <FooterMenu />
    </>
  );
}

export default Foods;
