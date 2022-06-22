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
