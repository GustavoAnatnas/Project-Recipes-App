import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import MyContext from '../Context/MyContext';
import FavoriteCards from './FavoriteCards';
import styles from '../Css/FavoriteRecipes.module.css';

function FavoriteRecipes() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  const [favoritedRecipes, setFavoriteRecipes] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState(null);

  const allFilterButton = () => {
    setFilteredFavorites(null);
  };

  const foodFilterButton = () => {
    const newData = favoritedRecipes.filter((item) => item.type === 'food');
    setFilteredFavorites(newData);
  };

  const drinkFilterButton = () => {
    const newData = favoritedRecipes.filter((item) => item.type === 'drink');
    setFilteredFavorites(newData);
  };

  const getFavoriteRecipes = () => {
    const result = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(result);
  };

  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
    setSearchHiden(false);
    getFavoriteRecipes();
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <div>
      <Header />
      <section>
        <nav className={ styles.section }>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => allFilterButton() }
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => foodFilterButton() }
          >
            Food
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => drinkFilterButton() }
          >
            Drinks
          </button>
        </nav>
        { favoritedRecipes
          ? (
            <FavoriteCards
              data={ filteredFavorites || favoritedRecipes }
              setNewData={ setFavoriteRecipes }
            />)
          : <h2> Sem receitas favoritas </h2>}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
