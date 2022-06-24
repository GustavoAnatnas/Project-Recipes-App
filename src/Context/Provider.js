import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import { getFoodRecipes,
  getFoodCategories,
  getFoodByCategory,
  getRandomFoodRecipes,
  getFoodIngredients,
  getFoodByIngredient,
  getSearchedFoodRecipes } // buscando na API as comidas procuradas pelo usuário
from '../Services/MealDB';
import { getDrinkRecipes,
  getDrinkCategories,
  getDrinkByCategory,
  getRandomDrinkRecipes,
  getDrinkIngredients,
  getDrinkByIngredient,
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
  const [randomFoodId, setRandomFoodId] = useState(0);
  const [randomDrinkId, setRandomDrinkId] = useState(0);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [filterIngredientRecipes, setFilterIngredientRecipes] = useState([]);

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

  const getRandomId = async () => {
    if (headerTitle === 'Explore Foods') {
      const id = await getRandomFoodRecipes();
      setRandomFoodId(id);
    } else {
      const id = await getRandomDrinkRecipes();
      setRandomDrinkId(id);
    }
  };

  const getIngredients = async () => {
    const ingFoods = await getFoodIngredients();
    setFoodIngredients(ingFoods);
    const ingDrinks = await getDrinkIngredients();
    setDrinkIngredients(ingDrinks);
  };

  const getFoodIngredientsRecipes = async (ingredient) => {
    const recipes = await getFoodByIngredient(ingredient);
    const MAX_NUMBER = 12;
    setFilterIngredientRecipes(recipes.slice(0, MAX_NUMBER));
  };

  const getDrinkIngredientsRecipes = async (ingredient) => {
    const recipes = await getDrinkByIngredient(ingredient);
    const MAX_NUMBER = 12;
    setFilterIngredientRecipes(recipes.slice(0, MAX_NUMBER));
  };

  useEffect(() => {
    getData();
    getCategories();
    getIngredients();
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
    getRandomId,
    randomFoodId,
    randomDrinkId,
    foodIngredients,
    drinkIngredients,
    filterIngredientRecipes,
    getFoodIngredientsRecipes,
    setFilterIngredientRecipes,
    getDrinkIngredientsRecipes,
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
