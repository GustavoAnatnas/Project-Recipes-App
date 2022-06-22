import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './Context/Provider';
import Login from './Components/Login';
import Profile from './Components/Profile';
import DoneRecipes from './Components/DoneRecipes';
import FavoriteRecipes from './Components/FavoriteRecipes';
import Foods from './Components/Foods';
import Drinks from './Components/Drinks';
import Explore from './Components/Explore';
import ExploreFoods from './Components/ExploreFoods';
import ExploreDrinks from './Components/ExploreDrinks';
import IngredientsFoods from './Components/IngredientsFoods';
import IngredientsDrinks from './Components/IngredientsDrinks';
import NationalitiesFoods from './Components/NationalitiesFoods';
import FoodDetails from './Components/FoodDetails';
import DrinkDetails from './Components/DrinkDetails';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />
        <Route exact path="/foods/:id/in-progress" component={ Login } />
        <Route exact path="/foods/:id/in-progress" component={ Login } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ IngredientsFoods } />
        <Route exact path="/explore/drinks/ingredients" component={ IngredientsDrinks } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ NationalitiesFoods }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
