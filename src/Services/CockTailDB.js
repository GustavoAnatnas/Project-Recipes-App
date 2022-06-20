const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const getDrinkRecipes = async () => {
  const result = await fetch(endPoint).then((response) => response.json());
  return result.drinks;
};

export default getDrinkRecipes;
