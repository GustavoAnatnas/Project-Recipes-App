import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';

function Foods() {
  const { foodData, foodCategories } = useContext(MyContext);

  return (
    <>
      <Categories data={ foodCategories } />
      <ItemCard data={ foodData } type="Meal" />
    </>
  );
}

export default Foods;
