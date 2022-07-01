import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../Context/MyContext';
import styled from '../Css/Categories.module.css';

function Categories({ data, type }) {
  const [filterStatus, setFilterStatus] = useState(false);
  const [actualFilter, setActualFilter] = useState('');
  const { filterRecipes, setFilteredData } = useContext(MyContext);
  const categoryGap = 5;
  const filteredItems = data.slice(0, categoryGap);

  const onFilterClick = (category) => {
    setActualFilter(category);
    if (actualFilter === category) {
      setFilterStatus(!filterStatus);
      setActualFilter('');
      return setFilteredData(null);
    }
    setFilterStatus(true);
    filterRecipes(category, type);
  };

  const clearFilters = () => {
    setActualFilter('');
    setFilterStatus(false);
    setFilteredData(null);
  };

  return (
    <aside className={ styled.asideBtnFilter }>
      <button
        className={ styled.btnFilterCategory }
        type="button"
        data-testid="All-category-filter"
        onClick={ () => clearFilters() }
      >
        All
      </button>
      {filteredItems.map((item) => (
        <button
          className={ styled.btnFilterCategory }
          type="button"
          key={ item.strCategory }
          data-testid={ [`${item.strCategory}-category-filter`] }
          onClick={ () => onFilterClick(item.strCategory) }
        >
          { item.strCategory }
        </button>
      ))}
    </aside>
  );
}
Categories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Categories;
