import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';
import apiResponse from './helpers/mockFetch';

const drinksData = require('./mocks/drinks.json');
const foodData = require('./mocks/food.json');

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(apiResponse);
});

afterEach(() => {
  jest.clearAllMocks();
});

const timeOut = 15000;
const numberOfCards = 12;
const slicedDrinks = drinksData.drinks.slice(0, numberOfCards);
const cardName = '0-card-name';
const slicedFoods = foodData.meals.slice(0, numberOfCards);
const drinksType = 'Drink';
const foodType = 'Meal';
const fetchCalls = 8;

describe('1-Testa a renderização da página principal de bebidas', () => {
  it('Testa se ao chamar a api são gerados 12 cards de bebidas na tela', async () => {
    renderPath('/drinks');
    const cards = await screen.findAllByTestId(/recipe-card/i);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(fetch).toHaveBeenCalledTimes(fetchCalls);
    expect(cards).toHaveLength(numberOfCards);
  });
  it('Verifica se os 12 cards são gerados corretamente', async () => {
    renderPath('/drinks');
    const images = await screen.findAllByTestId(/card-img/i);
    const cards = await screen.findAllByTestId(/recipe-card/i);
    const names = await screen.findAllByTestId(/-card-name/i);
    slicedDrinks.forEach((item, index) => {
      expect(images[index].src).toBe(item[`str${drinksType}Thumb`]);
      expect(cards).toHaveLength(numberOfCards);
      expect(names[index].innerHTML.includes(item[`str${drinksType}`])).toBeTruthy();
    });
  });
  it('Testa se ao clicar no card é renderizada a tela de detalhes do item', async () => {
    const { history } = renderPath('/drinks');
    const card = await screen.findByTestId('0-recipe-card');
    expect(card).toBeInTheDocument();
    userEvent.click(card);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997');
  });
});
describe('2-Testa o funcionamento filtros por categoria da pagina principal', () => {
  it('Testa se o botão de filtro retorna os items corretos', async () => {
    renderPath('/drinks');
    const categoryBtn = await screen.findByRole('button', { name: 'Cocktail' });
    const allBtn = await screen.findByRole('button', { name: 'All' });
    const firstDrink = await screen.findByRole('heading', { name: /gg/i, level: 4 });
    expect(firstDrink).toBeInTheDocument();
    userEvent.click(categoryBtn);
    const filtredDrink = await screen
      .findByRole('heading', { name: /155 belmont/i, level: 4 });
    expect(filtredDrink).toBeInTheDocument();
    expect(firstDrink).not.toBeInTheDocument();
    userEvent.click(allBtn);
    const ggDrink = await screen.findByTestId(cardName);
    expect(ggDrink).toBeInTheDocument();
    expect(ggDrink.innerHTML).toBe('GG');
  }, timeOut);
  it('Testa se os filtros por categorias funcionam como um toggle', async () => {
    renderPath('/drinks');
    const categoryBtn = await screen.findByRole('button', { name: 'Cocktail' });
    const firstDrink = await screen.findByRole('heading', { name: /gg/i, level: 4 });
    expect(firstDrink).toBeInTheDocument();
    userEvent.click(categoryBtn);
    const filtredDrink = await screen
      .findByRole('heading', { name: /155 belmont/i, level: 4 });
    expect(filtredDrink).toBeInTheDocument();
    userEvent.click(categoryBtn);
    const ggDrink = await screen.findByTestId(cardName);
    expect(ggDrink).toBeInTheDocument();
    expect(ggDrink.innerHTML).toBe('GG');
  }, timeOut);
});
describe('3-Testa a renderização da página principal de comidas', () => {
  it('Testa se ao chamar a api são gerados 12 cards de comidas na tela', async () => {
    renderPath('/foods');
    const cards = await screen.findAllByTestId(/recipe-card/i);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(fetch).toHaveBeenCalledTimes(fetchCalls);
    expect(cards).toHaveLength(numberOfCards);
  }, timeOut);
  it('Verifica se os 12 cards são gerados corretamente', async () => {
    renderPath('/foods');
    const images = await screen.findAllByTestId(/card-img/i);
    const cards = await screen.findAllByTestId(/recipe-card/i);
    const names = await screen.findAllByTestId(/-card-name/i);
    slicedFoods.forEach((item, index) => {
      expect(images[index].src).toBe(item[`str${foodType}Thumb`]);
      expect(cards).toHaveLength(numberOfCards);
      expect(names[index].innerHTML.includes(item[`str${foodType}`])).toBeTruthy();
    });
  });
  it('Testa se ao clicar no card é renderizada a tela de detalhes do item', async () => {
    const { history } = renderPath('/foods');
    const card = await screen.findByTestId('0-recipe-card');
    expect(card).toBeInTheDocument();
    userEvent.click(card);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods/52977');
  });
});
describe('4-Testa o funcionamento filtros por categoria da pagina principal', () => {
  it('Testa se o botão de filtro retorna os items corretos', async () => {
    renderPath('/foods');
    const categoryBtn = await screen.findByRole('button', { name: 'Chicken' });
    const allBtn = await screen.findByRole('button', { name: 'All' });
    const firstFood = await screen.findByRole('heading', { name: /corba/i, level: 4 });
    expect(firstFood).toBeInTheDocument();
    userEvent.click(categoryBtn);
    const filtredFood = await screen
      .findByRole('heading', { name: 'Ayam Percik', level: 4 });
    expect(filtredFood).toBeInTheDocument();
    expect(firstFood).not.toBeInTheDocument();
    userEvent.click(allBtn);
    const corbaFood = await screen.findByTestId(cardName);
    expect(corbaFood).toBeInTheDocument();
    expect(corbaFood.innerHTML).toBe('Corba');
  }, timeOut);
  it('Testa se os filtros por categorias funcionam como um toggle', async () => {
    renderPath('/foods');
    const categoryBtn = await screen.findByRole('button', { name: 'Chicken' });
    const firstFood = await screen.findByRole('heading', { name: /corba/i, level: 4 });
    expect(firstFood).toBeInTheDocument();
    userEvent.click(categoryBtn);
    const filteredFood = await screen
      .findByRole('heading', { name: 'Ayam Percik', level: 4 });
    expect(filteredFood).toBeInTheDocument();
    userEvent.click(categoryBtn);
    const corbaFood = await screen.findByTestId(cardName);
    expect(corbaFood).toBeInTheDocument();
    expect(corbaFood.innerHTML).toBe('Corba');
  }, timeOut);
});
