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

const pagePath = '/foods/52768/in-progress';
const MEAL_INGREDIENTS = ['digestive biscuits', '175g/6oz'];

describe('1-Testa a página de FoodsInProgress', () => {
  test('Testa se ao entrar na página a mesma faz a requisição a Api', () => {
    renderPath(pagePath);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52768');
  });
  test('Testa se os items são gerados corretamente', async () => {
    renderPath(pagePath);
    const [ingredient, measure] = MEAL_INGREDIENTS;

    const cardImg = await screen.findByTestId('recipe-photo');
    const recipeTitle = screen
      .getByRole('heading', { level: 2, name: 'Apple Frangipan Tart' });
    const shareButton = screen.getByTestId('share-btn');
    const favoriteButton = screen.getByTestId('favorite-btn');
    const ingredientsSection = screen
      .getByRole('heading', { level: 3, name: 'Ingredients' });
    const instructionsSection = screen
      .getByRole('heading', { level: 3, name: 'Instructions' });
    const ingredients = screen.getByText(`${ingredient} - ${measure}`);
    const instructionsText = screen
      .getByText(/Bake for 20-25 minutes until golden-brown/i);
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
      .toHaveBeenCalledWith('http://localhost:3000/foods/52768');
    jest.resetAllMocks();
  });
});
describe('2-Testa o funcionamento dos botões de favorito e finalizar receita', () => {
  test('Testa o funcionamento do botão de favoritar receita',
    async () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '52768',
        type: 'food',
        nationality: 'British',
        category: 'Dessert',
        alcoholicOrNot: '',
        name: 'Apple Frangipan Tart',
        image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
      }]));
      const setItem = jest.spyOn(Storage.prototype, 'setItem');
      renderPath(pagePath);
      const favoriteButton = await screen.findByTestId('favorite-btn');
      expect(favoriteButton.src).toBe(`http://localhost/foods/52768/${blackHeartIcon}`);
      userEvent.click(favoriteButton);
      expect(setItem).toHaveBeenCalled();
      expect(favoriteButton.src).toBe(`http://localhost/foods/52768/${whiteHeartIcon}`);
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
