import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';
import apiResponse from './helpers/mockFetch';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(apiResponse);
});

afterEach(() => {
  jest.clearAllMocks();
});

const pagePath = '/drinks/15997/in-progress';
const DRINK_INGREDIENTS = ['Galliano', '2 1/2 shots'];

describe('1-Testa a página de drinksInProgress', () => {
  test('Testa se ao entrar na página a mesma faz a requisição a Api', () => {
    renderPath(pagePath);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997');
  });
  test('Testa se os items são gerados corretamente', async () => {
    renderPath(pagePath);
    const [ingredient, measure] = DRINK_INGREDIENTS;

    const cardImg = await screen.findByTestId('recipe-photo');
    const recipeTitle = screen
      .getByRole('heading', { level: 2, name: 'GG' });
    const shareButton = screen.getByTestId('share-btn');
    const favoriteButton = screen.getByTestId('favorite-btn');
    const ingredientsSection = screen
      .getByRole('heading', { level: 3, name: 'Ingredients' });
    const instructionsSection = screen
      .getByRole('heading', { level: 3, name: 'Instructions' });
    const ingredients = screen.getByText(`${ingredient} - ${measure}`);
    const instructionsText = screen.getByText(/you now have a your very own gg/i);
    const finishRecipeButton = screen.getByRole('button', { name: /Finish Recipe/i });

    expect(cardImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(ingredientsSection).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instructionsSection).toBeInTheDocument();
    expect(instructionsText).toBeInTheDocument();
    expect(finishRecipeButton).toBeInTheDocument();
  });
  test('Testa se o link é copiado para o clipboard ao clicar no botão', async () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    renderPath(pagePath);
    userEvent.click(await screen.findByTestId('share-btn'));
    expect(window.navigator.clipboard.writeText)
      .toHaveBeenCalledWith('http://localhost:3000/drinks/15997');
    jest.resetAllMocks();
  });
});
describe('2-Testa o funcionamento dos botões de favorito e finalizar receita', () => {
  test('Testa o funcionamento do botão de favoritar comida',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: '15997',
          type: 'drink',
          nationality: '',
          category: 'Ordinary Drink',
          alcoholicOrNot: 'Optional alcohol',
          name: 'GG',
          image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        },
      ]));
      const setItem = jest.spyOn(Storage.prototype, 'setItem');
      renderPath(pagePath);
      const favoriteButton = await screen.findByTestId('favorite-btn');
      expect(favoriteButton.src).toBe(`http://localhost/drinks/15997/${blackHeartIcon}`);
      userEvent.click(favoriteButton);
      expect(setItem).toHaveBeenCalled();
      expect(favoriteButton.src).toBe(`http://localhost/drinks/15997/${whiteHeartIcon}`);
      setItem.mockRestore();
      localStorage.clear();
    });
  test('Testa se o botão de finalizar está inicialmente desabilitado', async () => {
    renderPath(pagePath);
    const finishButton = await screen.findByRole('button', { name: /Finish Recipe/i });
    expect(finishButton).toBeDisabled();
  });
  test('Testa se o botão é habilitado ao marcar todos os ingredientes', async () => {
    renderPath(pagePath);
    const ingredients = await screen.findAllByRole('checkbox');
    ingredients.forEach((item) => userEvent.click(item));
    ingredients.forEach((item) => expect(item).toBeChecked());
    const finishBtn = screen.getByRole('button', { name: /Finish Recipe/i });
    expect(finishBtn).not.toBeDisabled();
    localStorage.clear();
  });
  test('Testa se o botão de finalizar redireciona a pagina correta', async () => {
    const { history } = renderPath(pagePath);
    const ingredients = await screen.findAllByRole('checkbox');
    ingredients.forEach((item) => userEvent.click(item));
    ingredients.forEach((item) => expect(item).toBeChecked());
    const finishBtn = await screen.findByRole('button', { name: /Finish Recipe/i });
    userEvent.click(finishBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
});
describe('3-Testa o funcionamento dos checkboxes', () => {
  test('Testa se ao marcar e desmarcar ele é salvo e removido do localStorage', 
    async () => {
      const setItem = jest.spyOn(Storage.prototype, 'setItem');
      renderPath(pagePath);
      const ingredients = await screen.findAllByRole('checkbox');
      userEvent.click(ingredients[0]);
      expect(setItem).toHaveBeenCalled();
      userEvent.click(ingredients[0]);
      expect(setItem).toHaveBeenCalled();
    });
});
