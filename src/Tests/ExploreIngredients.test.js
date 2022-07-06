import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';
import apiResponse from './helpers/mockFetch';

const { drinks } = require('./mocks/drinksIngredientsUrl.json');

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(apiResponse);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('1-Testa a tela de explorar por ingredientes de drinks', () => {
  test('Testa se os cards de ingredientes são gerados na tela', async () => {
    const INGREDIENTS_BUTTONS = 12;
    renderPath('/explore/drinks/ingredients');

    const images = await screen.findAllByTestId(/card-img/i);
    const ingredientsBtns = images.filter((img) => !img.alt.includes('icon'));
    expect(ingredientsBtns).toHaveLength(INGREDIENTS_BUTTONS);
    ingredientsBtns.forEach((ingredient, index) => {
      expect(ingredient.alt).toBe(drinks[index].strIngredient1);
    });
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  });
  test('Testa se ao clicar em um drink o user é redirecionado para a tela principal',
    async () => {
      const { history } = renderPath('/explore/drinks/ingredients');
      const ginCard = await screen.findByTestId('2-card-img');
      userEvent.click(ginCard);
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');
    });
});
