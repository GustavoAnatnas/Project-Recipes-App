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
