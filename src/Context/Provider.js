import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import getFoodRecipes from '../Services/MealDB';
import getDrinkRecipes from '../Services/CockTailDB';

function Provider({ children }) {
  const [foodData, setFoodData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);

  const getDrinksData = async () => {
    const result = await getDrinkRecipes();
    setDrinksData(result);
  };

  const getFoodData = async () => {
    const result = await getFoodRecipes();
    setFoodData(result);
  };
  useEffect(() => {
    getFoodData();
    getDrinksData();
  }, []);

  const context = {
    foodData,
    drinksData,
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
