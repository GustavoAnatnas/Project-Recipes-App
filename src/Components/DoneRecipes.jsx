import React, { useContext, useEffect } from 'react';
import Header from './Header';
import MyContext from '../Context/MyContext';

function DoneRecipes() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <Header />
  );
}

export default DoneRecipes;
