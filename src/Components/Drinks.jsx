import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';
import FooterMenu from './FooterMenu';
import Header from './Header';
import SearchBar from './SearchBar';

function Drinks() {
  const { drinksData, drinkCategories,
    setHeaderTitle, setSearchHiden, drinksFilteredBySearch } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Drinks');
    setSearchHiden(true);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    drinksFilteredBySearch === null && (
      global.alert('Sorry, we haven\'t found any recipes for these filters.')),
    drinksFilteredBySearch && drinksFilteredBySearch.length === 1
      ? <Redirect to={ `/drinks/${drinksFilteredBySearch[0].idDrink}` } />
      : (
        <>
          <Header />
          <SearchBar foodOrDrink="drink" />
          <Categories data={ drinkCategories } type="Drink" />
          <ItemCard
            data={
              drinksFilteredBySearch
              && drinksFilteredBySearch.length > 0 ? drinksFilteredBySearch : drinksData
            }
            type="Drink"
          />
          <FooterMenu />
        </>
      )
  );
}

export default Drinks;
