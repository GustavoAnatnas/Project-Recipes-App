import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';
import FooterMenu from './FooterMenu';
import Header from './Header';
import SearchBar from './SearchBar';
import styled from '../Css/Foods.module.css';

function Drinks() {
  const { drinksData, drinkCategories,
    setHeaderTitle, setSearchHiden,
    drinksFilteredBySearch, filterIngredientRecipes } = useContext(MyContext);
  const [drinkCard, setDrinkCard] = useState([]);
  useEffect(() => {
    setHeaderTitle('Drinks');
    setSearchHiden(true);
    if (filterIngredientRecipes.length > 0) {
      setDrinkCard(filterIngredientRecipes);
    } else if (drinksFilteredBySearch.length > 0) {
      setDrinkCard(drinksFilteredBySearch);
    } else {
      setDrinkCard(drinksData);
    }
  }, [setHeaderTitle, setSearchHiden,
    filterIngredientRecipes, drinksFilteredBySearch, drinksData]);

  return (
    drinksFilteredBySearch === null && (
      global.alert('Sorry, we haven\'t found any recipes for these filters.')),
    drinksFilteredBySearch && drinksFilteredBySearch.length === 1
      ? <Redirect to={ `/drinks/${drinksFilteredBySearch[0].idDrink}` } />
      : (
        <div className={ styled.drinkScreen }>
          <Header />
          <SearchBar foodOrDrink="drink" />
          <Categories data={ drinkCategories } type="Drink" />
          <ItemCard
            data={ drinkCard }
            type="Drink"
          />
          <FooterMenu />
        </div>
      )
  );
}

export default Drinks;
