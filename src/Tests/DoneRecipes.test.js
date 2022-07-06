import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';
import apiResponse from './helpers/mockFetch';

const setDoneRecipes = () => {
  localStorage.setItem(
    'doneRecipes',
    JSON.stringify([
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: ['alcoholic'],
      },
    ]),
  );
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(apiResponse);
  setDoneRecipes();
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});
const pagePath = '/done-recipes';

describe('1 - Testa a renderização dos botões da pagina', () => {
  test('Testa se os botões estão presentes na tela', () => {
    const { history } = renderPath(pagePath);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');

    const allBtn = screen.getByText(/All/i);
    const foodBtn = screen.getByText(/Food/i);
    const drinksBtn = screen.getByText(/Drinks/i);

    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });
});

describe('2- Testa o funcionamento dos cards e dos botões de filtragem', () => {
  test('Testa se os cards são renderizados corretamente', () => {
    renderPath(pagePath);
    const allBtn = screen.getByText(/All/i);
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const foodImg = screen.getByTestId('0-horizontal-image');
    const foodInfos = screen.getByTestId('0-horizontal-top-text');
    const drinkImg = screen.getByTestId('1-horizontal-image');
    const drinkInfos = screen.getByTestId('1-horizontal-top-text');
    expect(foodImg).toBeInTheDocument();
    expect(foodImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(foodInfos).toHaveTextContent(/Italian - Vegetarian/i);
    expect(drinkImg).toBeInTheDocument();
    expect(drinkInfos).toHaveTextContent(/Alcoholic/i);
  });

  test('Testa o botão de filtrar por drinks', () => {
    renderPath(pagePath);
    const drinksBtn = screen.getByText('Drinks');
    expect(drinksBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
    const drinkImg = screen.getByTestId('1-horizontal-image');
    const drinkInfos = screen.getByTestId('1-horizontal-top-text');
    expect(drinkImg).toBeInTheDocument();
    expect(drinkInfos).toHaveTextContent(/Alcoholic/i);
  });
  test('Testa o botão de share', () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    renderPath(pagePath);
    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareButton);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
    expect(window.navigator.clipboard.writeText)
      .toHaveBeenCalledWith('http://localhost:3000/foods/52771');
  });
});
