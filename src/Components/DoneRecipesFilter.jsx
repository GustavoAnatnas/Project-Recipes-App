import React from 'react';

function DoneRecipesFilter() {
  return (
    <aside>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={}
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        // onClick={}
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={}
      >
        Drinks
      </button>
    </aside>
  );
}

export default DoneRecipesFilter;
