import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';
import FooterMenu from './FooterMenu';

function Foods() {
  const { foodData, foodCategories } = useContext(MyContext);

  return (
    <>
      <Categories data={ foodCategories } type="Meal" />
      <ItemCard data={ foodData } type="Meal" />
      <FooterMenu />
    </>
  );
}

export default Foods;
