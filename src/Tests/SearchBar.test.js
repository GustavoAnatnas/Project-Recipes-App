import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';

const foodData = require('./mocks/food.json');
const drinksData = require('./mocks/drinks.json');
const ingredientReturn = require('./mocks/ingredientSearch.json');
const firstLetterReturn = require('./mocks/firstLetterSearch.json');
const nameSearch = require('./mocks/nameSearch.json');

describe('1-Testa a implementação da barra de busca', () => {
  it('Testa se a barra é renderizada com os elementos corretos', () => {
    renderPath('/drinks');
    const ingredientRadio = screen.getByLabelText(/Ingredient/i);
    const nameRadio = screen.getByLabelText(/Name/i);
    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});

describe('2-Testa o funcionamento da barra de busca', () => {
  // beforeEach(() => {
  //   renderPath('/drinks');
  //   const searchHeaderBtn = screen.getByTestId('search-top-btn');
  //   userEvent.click(searchHeaderBtn);
  // });
  it('Testa a busca por ingredientes da barra de busca', () => {
    renderPath('/drinks');
    const searchHeaderBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchHeaderBtn);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(ingredientReturn),
    }));
    const ingredientRadio = screen.getByLabelText(/Ingredient/i);
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'water');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=water');
    // global.fetch.mockRestore();
  });
  it('Testa a busca por nome da barra de busca', () => {
    renderPath('/drinks');
    const searchHeaderBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchHeaderBtn);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinksData),
    }));
    const ingredientRadio = screen.getByLabelText(/Ingredient/i);
    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'margarita');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=margarita');
    // global.fetch.mockClear();
  });
});
// describe('', () => {});
