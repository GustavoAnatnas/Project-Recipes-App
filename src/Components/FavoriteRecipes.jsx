import React, { useContext, useEffect } from 'react';
import Header from './Header';

function FavoriteRecipes() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
    setSearchHiden(false);
  }, []);

  return (
    <Header />
  );
}

export default FavoriteRecipes;
