const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const getFoodRecipes = async () => {
  const result = await fetch(endPoint).then((response) => response.json());
  return result.meals;
};

export default getFoodRecipes;
