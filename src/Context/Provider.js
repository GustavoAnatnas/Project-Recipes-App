import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import { getFoodRecipes,
  getFoodCategories,
  getFoodByCategory }
from '../Services/MealDB';
import { getDrinkRecipes,
  getDrinkCategories,
  getDrinkByCategory }
from '../Services/CockTailDB';

function Provider({ children }) {
  const [foodData, setFoodData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [foodCategories, setFoodCategory] = useState([]);
  const [drinkCategories, setDrinkCategory] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [filteredData, setFilteredData] = useState(null);

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
