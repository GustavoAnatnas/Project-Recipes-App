const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const categoryEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const getDrinkRecipes = async () => {
  const result = await fetch(endPoint).then((response) => response.json());
  return result.drinks;
};

export const getDrinkCategories = async () => {
  const result = await fetch(categoryEndPoint).then(((response) => response.json()));
  return result.drinks;
};

export const getDrinkByCategory = async (category) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const result = await fetch(url).then((response) => response.json());
  return result.drinks;
};

// items procurados no campo de busca do header
export const getSearchedDrinkRecipes = async (searchType, searchInput) => { // searchType: tipo de filtro; searchInput: palavra ou letra buscada
  const link = `https://www.thecocktaildb.com/api/json/v1/1/${searchType}${searchInput}`;
  const result = await fetch(link).then((response) => response.json());
  return result.drinks;
};
