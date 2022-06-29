const drinksData = require('../mocks/drinks.json');
const drinksCategories = require('../mocks/categoryDrinks.json');
const drinksIngredients = require('../mocks/drinksIngredientsUrl.json');
const foodData = require('../mocks/food.json');
const foodCategories = require('../mocks/categoryFoods.json');
const foodIngredients = require('../mocks/foodIngredientsUrl.json');
const waterSearchResult = require('../mocks/ingredientSearch.json');
const nameSearchResult = require('../mocks/nameSearch.json');
const firstLetterSearchResult = require('../mocks/firstLetterSearch.json');

const badResult = { meals: [{}], drinks: [{}] };

const allDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const drinksCategoryUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const drinksIngredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const allFoodsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const foodCategoryUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const foodIngredientsUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

const searchByWater = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=water';
const searchByName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const searchByFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b';

const apiResponse = (url) => {
  if (url === allDrinksUrl) {
    return Promise.resolve({
      json: () => Promise.resolve(drinksData),
    });
  }
  if (url === drinksCategoryUrl) {
    return Promise.resolve({
      json: () => Promise.resolve(drinksCategories),
    });
  }
  if (url === drinksIngredientsUrl) {
    return Promise.resolve({
      json: () => Promise.resolve(drinksIngredients),
    });
  }
  if (url === allFoodsUrl) {
    return Promise.resolve({
      json: () => Promise.resolve(foodData),
    });
  }
  if (url === foodCategoryUrl) {
    return Promise.resolve({
      json: () => Promise.resolve(foodCategories),
    });
  }
  if (url === foodIngredientsUrl) {
    return Promise.resolve({
      json: () => Promise.resolve(foodIngredients),
    });
  }
  if (url === searchByWater) {
    return Promise.resolve({
      json: () => Promise.resolve(waterSearchResult),
    });
  }
  if (url === searchByName) {
    return Promise.resolve({
      json: () => Promise.resolve(nameSearchResult),
    });
  }
  if (url === searchByFirstLetter) {
    return Promise.resolve({
      json: () => Promise.resolve(firstLetterSearchResult),
    });
  }
  return Promise.resolve({ json: () => Promise.resolve(badResult) });
};

export default apiResponse;
