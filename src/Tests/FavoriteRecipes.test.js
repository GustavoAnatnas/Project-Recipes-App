import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';

// const getItem = jest.spyOn(Storage.prototype, 'getItem');
const pagePath = '/favorite-recipes';
const favoriteRecipes = [
  {
    id: '52929',
    type: 'food',
    nationality: 'Canadian',
    category: 'Dessert',
    alcoholicOrNot: '',
    name: 'Timbits',
    image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
  },
  {
    id: '17225',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Ace',
    image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
  },
];

describe('1-Testa a página de receitas favoritas', () => {
  test('Testa se a página é renderizada corretamente', () => {
    renderPath(pagePath);
    const pageTitle = screen
      .getByRole('heading', { name: /favorite recipes/i, level: 2 });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const foodBtn = screen.getByRole('button', { name: /food/i });
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    expect(pageTitle).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
  test('Testa a mensagem para quando não existem receitas favoritas', () => {
    renderPath(pagePath);
    const noRecipeTitle = screen
      .getByRole('heading', { name: /sem receitas favoritas/i, level: 2 });
    expect(noRecipeTitle).toBeInTheDocument();
  });
  test('Testa se as receitas favoritadas aparecem na tela de favoritas', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    renderPath(pagePath);
    expect(getItem).toHaveBeenCalled();
    const aceDrink = screen.getByRole('heading', { name: 'Ace', level: 4 });
    const TimbitsFood = screen.getByRole('heading', { name: 'Timbits', level: 4 });
    expect(aceDrink).toBeInTheDocument();
    expect(TimbitsFood).toBeInTheDocument();
    getItem.mockRestore();
    localStorage.clear();
  });
});
describe('2-Testa o funcionamento dos botões de filtro da pagina de favoritos ', () => {
  test('Testa o botão de filtrar por comidas', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderPath(pagePath);
    const foodBtn = screen.getByRole('button', { name: /food/i });
    const aceDrink = screen.getByRole('heading', { name: 'Ace', level: 4 });
    const TimbitsFood = screen.getByRole('heading', { name: 'Timbits', level: 4 });
    expect(aceDrink).toBeInTheDocument();
    expect(TimbitsFood).toBeInTheDocument();
    userEvent.click(foodBtn);
    expect(aceDrink).not.toBeInTheDocument();
    expect(TimbitsFood).toBeInTheDocument();
    localStorage.clear();
  });
  test('Testa o botão de filtrar por bebidas e o botão de All', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderPath(pagePath);
    const allBtn = screen.getByRole('button', { name: /all/i });
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    const aceDrink = screen.getByRole('heading', { name: 'Ace', level: 4 });
    const TimbitsFood = screen.getByRole('heading', { name: 'Timbits', level: 4 });
    expect(aceDrink).toBeInTheDocument();
    userEvent.click(drinksBtn);
    expect(aceDrink).not.toBeInTheDocument();
    userEvent.click(allBtn);
    expect(TimbitsFood).toBeInTheDocument();
    localStorage.clear();
  });
});
describe('3-Testa os botões de share e favoritar dos cards gerados', () => {
  test('Testa os botões de favoritar da página', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderPath(pagePath);
    const firstFood = screen.getByTestId('0-horizontal-name');
    const firstFavBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(firstFood.innerHTML).toBe('Timbits');
    userEvent.click(firstFavBtn);
    expect(firstFood.innerHTML).toBe('Ace');
    userEvent.click(firstFavBtn);
    expect(firstFood).not.toBeInTheDocument();
    localStorage.clear();
  });
  test('Testa os botões de compartilhar da página', () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderPath(pagePath);
    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
    const secondShareBtn = screen.getByTestId('1-horizontal-share-btn');
    const copiedMessage = screen
      .getAllByRole('heading', { name: /link copied!/i, level: 6 });
    userEvent.click(firstShareBtn);
    expect(copiedMessage[0]).toBeInTheDocument();
    expect(window.navigator.clipboard.writeText)
      .toHaveBeenCalledWith('http://localhost:3000/foods/52929');
    userEvent.click(secondShareBtn);
    expect(copiedMessage[1]).toBeInTheDocument();
    expect(window.navigator.clipboard.writeText)
      .toHaveBeenCalledWith('http://localhost:3000/drinks/17225');
    jest.resetAllMocks();
  });
});

// testar link copied, função de favoritar, função de share, dos foods e drinks
