import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import { getFoodRecipes,
  getFoodCategories,
  getFoodByCategory,
  getSearchedFoodRecipes } // buscando na API as comidas procuradas pelo usuário
from '../Services/MealDB';
import { getDrinkRecipes,
  getDrinkCategories,
  getDrinkByCategory,
  getSearchedDrinkRecipes } // buscando na API as bebidas procuradas pelo usuário
from '../Services/CockTailDB';

function Provider({ children }) {
  const [foodData, setFoodData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [foodCategories, setFoodCategory] = useState([]);
  const [drinkCategories, setDrinkCategory] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [headerTitle, setHeaderTitle] = useState('');
  const [searchHiden, setSearchHiden] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [foodsFilteredBySearch, setFoodsFilteredBySearch] = useState([]); // comidas buscadas pelo usuário
  const [drinksFilteredBySearch, setDrinksFilteredBySearch] = useState([]); // bebidas buscadas pelo usuário

  const getData = async () => {
    const foodArray = await getFoodRecipes();
    const drinkArray = await getDrinkRecipes();
    setFoodData(foodArray);
    setDrinksData(drinkArray);
  };

  const getCategories = async () => {
    const foodCategoryData = await getFoodCategories();
    const drinkCategoryData = await getDrinkCategories();
    setFoodCategory(foodCategoryData);
    setDrinkCategory(drinkCategoryData);
  };

  const filterRecipes = async (category, type) => {
    if (type === 'Meal') {
      const result = await getFoodByCategory(category);
      setFilteredData(result);
    }
    if (type === 'Drink') {
      const result = await getDrinkByCategory(category);
      setFilteredData(result);
    }
  };

  const filterSearchedRecipes = async (foodOrDrink, searchType, searchInput) => {
    if (foodOrDrink === 'food') {
      const result = await getSearchedFoodRecipes(searchType, searchInput);
      setFoodsFilteredBySearch(result);
    }
    if (foodOrDrink === 'drink') {
      const result = await getSearchedDrinkRecipes(searchType, searchInput);
      setDrinksFilteredBySearch(result);
    }
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  const context = {
    foodData,
    drinksData,
    foodCategories,
    drinkCategories,
    email,
    password,
    setEmail,
    setPassword,
    filterRecipes,
    filteredData,
    setFilteredData,
    headerTitle,
    setHeaderTitle,
    searchHiden,
    setSearchHiden,
    searchValue,
    setSearchValue,
    filterSearchedRecipes, // método para filtrar receitas com base na busca do usuário
    foodsFilteredBySearch, // arr de comidas com base na busca do usuário
    drinksFilteredBySearch, // arr de bebidas com base na busca do usuário
  };
  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
