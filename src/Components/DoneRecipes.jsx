import React, { useContext, useEffect } from 'react';
import Header from './Header';

function DoneRecipes() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setSearchHiden(false);
  }, []);

  return (
    <Header />
  );
}

export default DoneRecipes;
