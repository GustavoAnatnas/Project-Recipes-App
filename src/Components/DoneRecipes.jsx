import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import MyContext from '../Context/MyContext';
import DoneRecipesFilter from './DoneRecipesFilter';
import DoneRecipesCards from './DoneRecipesCards';
import styles from '../Css/DoneRecipes.module.css';

function DoneRecipes() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  const [finishedRecipes, setFinishedRecipes] = useState([]);
  const [finishedRecipeFilter, setFinishedRecipeFilter] = useState(''); // o filtro em si

  const getFinishedRecipesFromStorage = () => {
    setFinishedRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  };

  const filterRecipes = (type) => {
    const filteredRecipes = finishedRecipes.filter((recipe) => recipe.type === type);
    setFinishedRecipes(filteredRecipes);
  };

  useEffect(() => {
    setHeaderTitle('Done Recipes');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  useEffect(() => {
    getFinishedRecipesFromStorage();
  }, []);

  useEffect(() => {
    if (finishedRecipeFilter === 'food') {
      filterRecipes('food');
    }
    if (finishedRecipeFilter === 'drink') {
      filterRecipes('drink');
    }
    if (finishedRecipeFilter === 'all') {
      getFinishedRecipesFromStorage();
    }
  }, [finishedRecipeFilter]);

  return (
    <div className={ styles.body }>
      <Header />
      <DoneRecipesFilter setFinishedRecipeFilter={ setFinishedRecipeFilter } />
      {
        finishedRecipes
          ? <DoneRecipesCards finishedRecipes={ finishedRecipes } />
          : null
      }
    </div>
  );
}

export default DoneRecipes;

/*

Salvar no storage para teste:

Key: doneRecipes
Value: [{"id":"123","type":"comida","nationality":"brasileira","category":"categoria 1","alcoholicOrNot":"non-alcoholic","name":"feijoada","image":"https://images.unsplash.com/photo-1564894809611-1742fc40ed80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60","doneDate":"2022-10-10","tags":["tag 1","tag 2","tag 3"]}]

*/
