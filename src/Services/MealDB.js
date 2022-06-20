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
