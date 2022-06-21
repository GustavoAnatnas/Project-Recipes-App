import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';

function Drinks() {
  const { drinksData, drinkCategories } = useContext(MyContext);

  return (
    <>
      <Categories data={ drinkCategories } type="Drink" />
      <ItemCard data={ drinksData } type="Drink" />
    </>
  );
}

export default Drinks;
