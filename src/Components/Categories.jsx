import React from 'react';
import PropTypes from 'prop-types';

function Categories({ data }) {
  const categoryGap = 5;
  const filteredItems = data.slice(0, categoryGap);

  return (
    <aside>
      {filteredItems.map((item) => (
        <button
          type="button"
          key={ item.strCategory }
          data-testid={ [`${item.strCategory}-category-filter`] }
        >
          { item.strCategory }
        </button>
      ))}
    </aside>
  );
}
Categories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Categories;
