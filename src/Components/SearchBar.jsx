import React, { useContext, useState } from 'react';
import MyContext from '../Context/MyContext';

function SearchBar() {
  // pegando informações do context
  const {
    searchValue, // valor digitado no campo de busca
    filterSearchedRecipes, // função que vai filtrar de acordo com os dados digitados no campo de busca
    foodsFilteredBySearch, // dados retornados de acordo com os dados digitados no campo de busca
  } = useContext(MyContext);

  const [searchRad, setSearchRad] = useState(''); // qual radio foi escolhido

  // settar no estado local o valor escolhido no radio button
  const handleRadioChange = (event) => {
    setSearchRad(event.target.value);
  };

  const handleSearchButton = () => { // ao clicar no botão de pesquisar...
    if (searchRad === 'First letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (searchRad === 'Ingredient') {
      filterSearchedRecipes('food', 'filter.php?i=', searchValue);
    }
    if (searchRad === 'Name') {
      filterSearchedRecipes('food', 'search.php?s=', searchValue);
    }
    if (searchRad === 'First letter') { // first letter
      filterSearchedRecipes('food', 'search.php?f=', searchValue);
    }
  };

  return (
    <div>
      {
        foodsFilteredBySearch.length > 0
          ? (
            console.log(foodsFilteredBySearch)
          )
          : null
      }
      <label htmlFor="searchRadio">
        <input
          type="radio"
          name="searchRadio"
          value="Ingredient"
          onChange={ handleRadioChange }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="searchRadio">
        <input
          type="radio"
          name="searchRadio"
          value="Name"
          onChange={ handleRadioChange }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="searchRadio">
        <input
          type="radio"
          name="searchRadio"
          value="First letter"
          onChange={ handleRadioChange }
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>
      <button
        type="button"
        onClick={ handleSearchButton }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
