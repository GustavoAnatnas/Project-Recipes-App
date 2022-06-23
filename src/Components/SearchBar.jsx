import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../Context/MyContext';

function SearchBar({ foodOrDrink }) {
  // pegando informações do context
  const {
    searchValue, // valor digitado no campo de busca
    filterSearchedRecipes, // função que vai filtrar de acordo com os dados digitados no campo de busca
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
      filterSearchedRecipes(foodOrDrink, 'filter.php?i=', searchValue);
    }
    if (searchRad === 'Name') {
      filterSearchedRecipes(foodOrDrink, 'search.php?s=', searchValue);
    }
    if (searchRad === 'First letter') {
      filterSearchedRecipes(foodOrDrink, 'search.php?f=', searchValue);
    }
  };

  return (
    <div>
      <label htmlFor="ingredientRadio">
        <input
          type="radio"
          name="searchRadio"
          id="ingredientRadio"
          value="Ingredient"
          onChange={ handleRadioChange }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="nameRadio">
        <input
          type="radio"
          name="searchRadio"
          id="nameRadio"
          value="Name"
          onChange={ handleRadioChange }
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="firstLetterRadio">
        <input
          type="radio"
          name="searchRadio"
          id="firstLetterRadio"
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

SearchBar.propTypes = {
  foodOrDrink: PropTypes.string.isRequired,
};

export default SearchBar;
