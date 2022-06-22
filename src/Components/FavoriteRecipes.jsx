import React, { useContext, useEffect } from 'react';
import Header from './Header';
import MyContext from '../Context/MyContext';

function FavoriteRecipes() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Favorite Recipes');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <Header />
  );
}

export default FavoriteRecipes;
