import { screen } from '@testing-library/react';
import renderPath from './helpers/RenderPath';
import apiResponse from './helpers/mockFetch';

const drinksData = require('./mocks/drinks.json');

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(apiResponse);
});

afterEach(() => {
  jest.clearAllMocks();
});

const numberOfCards = 12;
const slicedDrinks = drinksData.drinks.slice(0, numberOfCards);
const drinksType = 'Drink';

describe('1-Testa a renderização da página principal de bebidas', () => {
  it('Testa se ao chamar a api são gerados 12 cards de bebidas na tela', async () => {
    renderPath('/drinks');
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const cards = await screen.findAllByTestId(/recipe-card/i);
    expect(cards).toHaveLength(numberOfCards);
  });
  it('verifica se os 12 cards são gerador corretamente', async () => {
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
  // definir nova promise para detalhes de 1 item;
});
