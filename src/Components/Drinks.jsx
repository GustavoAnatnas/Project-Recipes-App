import React, { useContext, useEffect } from 'react';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';
import FooterMenu from './FooterMenu';
import Header from './Header';
import SearchBar from './SearchBar';

function Drinks() {
  const { drinksData, drinkCategories,
    setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Drinks');
    setSearchHiden(true);
  }, []);

  return (
    <>
      <Header />
      <SearchBar foodOrDrink="drink" />
      <Categories data={ drinkCategories } type="Drink" />
      <ItemCard data={ drinksData } type="Drink" />
      <FooterMenu />
    </>
  );
}

export default Drinks;
