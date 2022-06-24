import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import Categories from './Categories';
import ItemCard from './ItemCard';
import FooterMenu from './FooterMenu';
import Header from './Header';
import SearchBar from './SearchBar';

function Foods() {
  const { foodData, foodCategories,
    setHeaderTitle, setSearchHiden,
    foodsFilteredBySearch, filterIngredientRecipes } = useContext(MyContext);
  const [foodCard, setFoodCard] = useState([]);

  useEffect(() => {
    setHeaderTitle('Foods');
    setSearchHiden(true);
    if (filterIngredientRecipes.length > 0) {
      setFoodCard(filterIngredientRecipes);
    } else if (foodsFilteredBySearch === null) {
      setFoodCard(foodData);
    } else if (foodsFilteredBySearch.length > 0) {
      setFoodCard(foodsFilteredBySearch);
    } else {
      setFoodCard(foodData);
    }
  }, [setHeaderTitle, setSearchHiden,
    filterIngredientRecipes, foodData, foodsFilteredBySearch]);

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
            data={ foodCard }
            type="Meal"
          />
          <FooterMenu />
        </>
      )
  );
}

export default Foods;
