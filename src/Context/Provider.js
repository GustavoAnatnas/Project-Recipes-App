import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import { getFoodRecipes,
  getFoodCategories,
  getFoodByCategory,
  getSearchedFoodRecipes,
  getFoodDetails, // buscando na API as comidas procuradas pelo usuário
  getRandomFoodRecipes } // buscando na API as comidas procuradas pelo usuário
from '../Services/MealDB';
import { getDrinkRecipes,
  getDrinkCategories,
  getDrinkByCategory,
  getSearchedDrinkRecipes,
  getDrinkDetails, // buscando na API as bebidas procuradas pelo usuário
  getRandomDrinkRecipes } // buscando na API as bebidas procuradas pelo usuário
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
  const [foodDetails, setFoodDetails] = useState([]); // detalhes da comida buscada pelo usuário
  const [drinkDetails, setDrinkDetails] = useState([]); // detalhes da bebida buscada pelo usuário
  const [copied, setCopied] = useState(false);
  const [randomFoodId, setRandomFoodId] = useState(0);
  const [randomDrinkId, setRandomDrinkId] = useState(0);

  const getData = async () => {
    const drinkArray = await getDrinkRecipes();
    const foodArray = await getFoodRecipes();
    setFoodData(foodArray);
    setDrinksData(drinkArray);
  };

  const getCategories = async () => {
    const drinkCategoryData = await getDrinkCategories();
    const foodCategoryData = await getFoodCategories();
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

  // const getDetails = async (foodOrDrink, id) => {
  //   if (foodOrDrink === 'food') {
  //     const result = await getFoodDetails(id);
  //     setFoodDetails(result);
  //   }
  //   if (foodOrDrink === 'drink') {
  //     const result = await getDrinkDetails(id);
  //     setDrinkDetails(result);
  //   }
  // };
  const getRandomId = async () => {
    if (headerTitle === 'Explore Foods') {
      const id = await getRandomFoodRecipes();
      setRandomFoodId(id);
    } else {
      const id = await getRandomDrinkRecipes();
      setRandomDrinkId(id);
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
    foodDetails,
    drinkDetails,
    copied,
    setCopied,
    setFoodDetails,
    getFoodDetails,
    setDrinkDetails,
    getDrinkDetails,
    getRandomId,
    randomFoodId,
    randomDrinkId,
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
