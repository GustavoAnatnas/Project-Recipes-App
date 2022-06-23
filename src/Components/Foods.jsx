import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';
import FooterMenu from './FooterMenu';
import Header from './Header';
import SearchBar from './SearchBar';

function Foods() {
  const { foodData, foodCategories,
    setHeaderTitle, setSearchHiden, foodsFilteredBySearch } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Foods');
    setSearchHiden(true);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    foodsFilteredBySearch === null && (
      global.alert('Sorry, we haven\'t found any recipes for these filters.')),
    foodsFilteredBySearch && foodsFilteredBySearch.length === 1
      ? <Redirect to={ `/foods/${foodsFilteredBySearch[0].idMeal}` } />
      : (
        <>
          <Header />
          <SearchBar foodOrDrink="food" />
          <Categories data={ foodCategories } type="Meal" />
          <ItemCard
            data={
              foodsFilteredBySearch
              && foodsFilteredBySearch.length > 0 ? foodsFilteredBySearch : foodData
            }
            type="Meal"
          />
          <FooterMenu />
        </>
      )
  );
}

export default Foods;
