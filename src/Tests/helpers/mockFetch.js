const drinksData = require('../mocks/drinks.json');
const catDriData = require('../mocks/categoryDrinks.json');
const ingDriData = require('../mocks/drinksIngredientsUrl.json');
const driDetData = require('../mocks/drinkDetail.json');
const drinkIngBtn = require('../mocks/drinksIngredientBtn.json');
const ingDriSearch = require('../mocks/ingredientSearch.json');
const nameDriSearch = require('../mocks/nameSearch.json');
const driFLSearch = require('../mocks/firstLetterSearch.json');

const foodData = require('../mocks/food.json');
const catFoodData = require('../mocks/categoryFoods.json');
const ingFoodData = require('../mocks/foodIngredientsUrl.json');
const ingFoodSearch = require('../mocks/foodSearchIng.json');
const nameFoodSearch = require('../mocks/foodSearchName.json');
const foodFLSearch = require('../mocks/foodSearchFirstLetter.json');
const foodCategoryFilter = require('../mocks/foodCategoryFilter.json');
const foodsNationalitiesData = require('../mocks/nationalities.json');
const japaneseFoodsData = require('../mocks/japaneseFoods.json');

const badResult = { meals: [{}], drinks: [{}] };

const allDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const categoryDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const ingredientDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const detailDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
const categoryFilterUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const drinkSearchIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=water';
const drinkSearchName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const drinkSearchFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b';

const allFoodsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const categoryFoodUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const ingredientFoodUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const foodFilterUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken';
const foodSearchIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=beef';
const foodSearchName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=pork';
const foodSearchFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=h';
const foodNationalitiesUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const japaneseFoodsUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese';

function moreApiResponses(url) {
  if (url === foodFilterUrl) {
    return Promise.resolve({ json: () => Promise.resolve(foodCategoryFilter) });
  }
  if (url === foodNationalitiesUrl) {
    return Promise.resolve({ json: () => Promise.resolve(foodsNationalitiesData) });
  }
  if (url === japaneseFoodsUrl) {
    return Promise.resolve({ json: () => Promise.resolve(japaneseFoodsData) });
  }
  return Promise.resolve({ json: () => Promise.resolve(badResult) });
}

function apiResponse(url) {
  if (url === allDrinksUrl) {
    return Promise.resolve({ json: () => Promise.resolve(drinksData) });
  }
  if (url === categoryDrinkUrl) {
    return Promise.resolve({ json: () => Promise.resolve(catDriData) });
  }
  if (url === ingredientDrinkUrl) {
    return Promise.resolve({ json: () => Promise.resolve(ingDriData) });
  }
  if (url === allFoodsUrl) {
    return Promise.resolve({ json: () => Promise.resolve(foodData) });
  }
  if (url === categoryFoodUrl) {
    return Promise.resolve({ json: () => Promise.resolve(catFoodData) });
  }
  if (url === ingredientFoodUrl) {
    return Promise.resolve({ json: () => Promise.resolve(ingFoodData) });
  }
  if (url === drinkSearchIngredient) {
    return Promise.resolve({ json: () => Promise.resolve(ingDriSearch) });
  }
  if (url === drinkSearchName) {
    return Promise.resolve({ json: () => Promise.resolve(nameDriSearch) });
  }
  if (url === drinkSearchFirstLetter) {
    return Promise.resolve({ json: () => Promise.resolve(driFLSearch) });
  }
  if (url === detailDrinkUrl) {
    return Promise.resolve({ json: () => Promise.resolve(driDetData) });
  }
  if (url === categoryFilterUrl) {
    return Promise.resolve({ json: () => Promise.resolve(drinkIngBtn) });
  }
  if (url === foodSearchIngredient) {
    return Promise.resolve({ json: () => Promise.resolve(ingFoodSearch) });
  }
  if (url === foodSearchFirstLetter) {
    return Promise.resolve({ json: () => Promise.resolve(foodFLSearch) });
  }
  if (url === foodSearchName) {
    return Promise.resolve({ json: () => Promise.resolve(nameFoodSearch) });
  }
  return moreApiResponses(url);
}

export default apiResponse;
