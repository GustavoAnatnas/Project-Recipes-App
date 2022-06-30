import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import { getFoodRecipes,
  getFoodCategories,
  getFoodByCategory,
  getSearchedFoodRecipes,
  getRandomFoodRecipes, // buscando na API as comidas procuradas pelo usuário
  getFoodIngredients,
  getFoodByIngredient } // buscando na API as comidas procuradas pelo usuário
from '../Services/MealDB';
import { getDrinkRecipes,
  getDrinkCategories,
  getDrinkByCategory,
  getSearchedDrinkRecipes,
  getRandomDrinkRecipes,
  getDrinkIngredients,
  getDrinkByIngredient } // buscando na API as bebidas procuradas pelo usuário
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
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [filterIngredientRecipes, setFilterIngredientRecipes] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState(false);
  const [startedRecipes, setStartedRecipes] = useState(false);
  const [recomendedFoods, setRecomendedFoods] = useState([]);
  const [recomendedDrinks, setRecomendedDrinks] = useState([]);
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

  const foodEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinkEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const SIX = 6;
  const getRecomendedFood = async () => {
    const result = await fetch(foodEndPoint).then((response) => response.json());
    setRecomendedFoods(result.meals.slice(0, SIX));
  };

  const getRecomendedDrink = async () => {
    const result = await fetch(drinkEndPoint).then((response) => response.json());
    setRecomendedDrinks(result.drinks.slice(0, SIX));
    console.log(result.drinks.slice(0, SIX));
  };

  const verifyLocalStorage = async (id, type) => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneRecipes !== null) {
      setDoneRecipes(getDoneRecipes.some((item) => item.id === id));
    }

    const getInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || [];
    if (getInProgress[type] !== undefined) {
      setStartedRecipes(`${id}` in getInProgress[type] || false);
    }
  };

  useEffect(() => {
    getData();
    getCategories();
    getIngredients();
    getRecomendedFood();
    getRecomendedDrink();
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
    setDrinkDetails,
    getRandomId,
    randomFoodId,
    randomDrinkId,
    measure,
    setMeasure,
    ingredients,
    setIngredients,
    foodIngredients,
    drinkIngredients,
    filterIngredientRecipes,
    getFoodIngredientsRecipes,
    setFilterIngredientRecipes,
    getDrinkIngredientsRecipes,
    favorite,
    setFavorite,
    doneRecipes,
    setDoneRecipes,
    startedRecipes,
    setStartedRecipes,
    recomendedFoods,
    setRecomendedFoods,
    recomendedDrinks,
    setRecomendedDrinks,
    verifyLocalStorage,
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
