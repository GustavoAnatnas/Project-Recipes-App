import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './Context/Provider';
import Login from './Components/Login';
import Profile from './Components/Profile';
import DoneRecipes from './Components/DoneRecipes';
import FavoriteRecipes from './Components/FavoriteRecipes';
import Foods from './Components/Foods';
import Drinks from './Components/Drinks';
import Explore from './Components/Explore';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ Login } />
        <Route exact path="/drinks/:id" component={ Login } />
        <Route exact path="/foods/:id/in-progress" component={ Login } />
        <Route exact path="/foods/:id/in-progress" component={ Login } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ Foods } />
        <Route exact path="/explore/drinks" component={ Login } />
        <Route exact path="/explore/foods/ingredients" component={ Login } />
        <Route exact path="/explore/drinks/ingredients" component={ Login } />
        <Route exact path="/explore/foods/nationalities" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
