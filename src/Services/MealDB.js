const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const categoryEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const getFoodRecipes = async () => {
  const result = await fetch(endPoint).then((response) => response.json());
  return result.meals;
};

export const getFoodCategories = async () => {
  const result = await fetch(categoryEndPoint).then(((response) => response.json()));
  return result.meals;
};

export const getFoodByCategory = async (category) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const result = await fetch(url).then((response) => response.json());
  return result.meals;
};

// items procurados no campo de busca do header
export const getSearchedFoodRecipes = async (searchType, searchInput) => { // searchType: tipo de filtro; searchInput: palavra ou letra buscada
  const link = `https://www.themealdb.com/api/json/v1/1/${searchType}${searchInput}`;
  const result = await fetch(link).then((response) => response.json());
  return result.meals;
};

// Busca receita de comida aleatoriamente
export const getRandomFoodRecipes = async () => {
  const link = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const result = await fetch(link).then((response) => response.json());
  return result.meals[0].idMeal;
};

export const getNationalities = async () => {
  const nationalitiesEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const result = await fetch(nationalitiesEndPoint).then((response) => response.json());
  return result.meals;
};

export const getByNationality = async (nationality) => {
  const link = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`;
  const result = await fetch(link).then((response) => response.json());
  return result.meals;
};

// Busca ingredientes
export const getFoodIngredients = async () => {
  const link = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const result = await fetch(link).then((response) => response.json());
  const MAX_NUMBER = 12;
  return result.meals.slice(0, MAX_NUMBER);
};

// Busca receitas por ingrediente
export const getFoodByIngredient = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const result = await fetch(url).then((response) => response.json());
  return result.meals;
};
