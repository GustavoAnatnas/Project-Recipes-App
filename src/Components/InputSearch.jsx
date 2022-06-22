import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';

function InputSearch() {
  const { setSearchValue } = useContext(MyContext);
  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchValue(value);
  };
  return (
    <input
      data-testid="search-input"
      type="text"
      onChange={ handleChange }
    />
  );
}

export default InputSearch;
