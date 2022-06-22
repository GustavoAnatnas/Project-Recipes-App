import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="searchRadio">
        <input
          type="radio"
          name="searchRadio"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label htmlFor="searchRadio">
        <input
          type="radio"
          name="searchRadio"
          value="name"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label htmlFor="searchRadio">
        <input
          type="radio"
          name="searchRadio"
          value="letter"
          data-testid="first-letter-search-radio"
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
