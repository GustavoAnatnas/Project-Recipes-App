import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';
import apiResponse from './helpers/mockFetch';

const nationalities = require('./mocks/nationalities.json');

const path = '/explore/foods/nationalities';
const dropdownId = 'explore-by-nationality-dropdown';
const numberOfCards = 12;
const timeOut = 12000;

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(apiResponse);
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('1-Testa a página de explore por nacionalidades', () => {
  test('Testa se a página é renderizada corretamente', () => {
    const { history } = renderPath(path);
    const title = screen
      .getByRole('heading', { name: /explore nationalities/i, level: 2 });
    const { pathname } = history.location;
    expect(title).toBeInTheDocument();
    expect(pathname).toBe(path);
  });
  test('Testa se são geradas 12 receitas de comidas na tela', async () => {
    renderPath(path);
    const recipes = await screen.findAllByTestId(/recipe-card/i);
    expect(recipes).toHaveLength(numberOfCards);
  });
  test('Testa se é gerado um select com todas as nacionalidades como opção', async () => {
    renderPath(path);
    const dropdown = await screen.findByTestId(dropdownId);
    expect(dropdown.options[0].value).toBe('All');
    const nationalitiesOptions = await screen.findAllByTestId(/-option/i);
    nationalitiesOptions.shift(0);
    (nationalities.meals).forEach((option, index) => {
      expect(nationalitiesOptions[index].innerHTML).toBe(option.strArea);
    });
  });
  test('Testa se ao escolher uma nacionalidades comidas da mesma aperecem na tela',
    async () => {
      renderPath(path);
      const dropdown = await screen.findByTestId(dropdownId);
      userEvent.selectOptions(dropdown, 'Japanese');
      const japaneseRecipe = await screen
        .findByRole('heading', { name: /honey teriyaki salmon/i, level: 4 });
      expect(japaneseRecipe).toBeInTheDocument();
    });
  test('Testa se ao clicar na opção de All voltam as comidas anteriores', async () => {
    renderPath(path);
    const dropdown = await screen.findByTestId(dropdownId);
    const corba = await screen.findByRole('heading', { name: /corba/i, level: 4 });
    expect(corba).toBeInTheDocument();
    userEvent.selectOptions(dropdown, 'Japanese');
    const teriyaki = await screen
      .findByRole('heading', { name: /honey teriyaki salmon/i, level: 4 });
    expect(teriyaki).toBeInTheDocument();
    expect(corba).not.toBeInTheDocument();
    userEvent.selectOptions(dropdown, 'All');
    expect(teriyaki).not.toBeInTheDocument();
  }, timeOut);
});
