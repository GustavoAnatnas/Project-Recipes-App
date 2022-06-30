import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';
import apiResponse from './helpers/mockFetch';

const fetchTimes = 4;
const searchTopBtn = 'search-top-btn';
const searchInputBar = 'search-input';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(apiResponse);
});
afterEach(() => {
  jest.clearAllMocks();
});

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

describe('2-Testa o funcionamento da barra de busca na pagina de drinks', () => {
  it('Testa a busca por ingredientes da barra de busca', async () => {
    renderPath('/drinks');
    userEvent.click(screen.getByTestId(searchTopBtn));
    const ingredientRadio = screen.getByLabelText(/Ingredient/i);
    const searchInput = screen.getByTestId(searchInputBar);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'water');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);
    expect(fetch).toHaveBeenCalledTimes(fetchTimes);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=water');
  });
  it('Testa a busca por nome da barra de busca', () => {
    renderPath('/drinks');
    userEvent.click(screen.getByTestId(searchTopBtn));
    const nameRadio = screen.getByLabelText(/name/i);
    const searchInput = screen.getByTestId(searchInputBar);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'margarita');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    expect(fetch).toHaveBeenCalledTimes(fetchTimes);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
  });
  it('Testa a busca por primeira letra da barra de busca', () => {
    renderPath('/drinks');
    userEvent.click(screen.getByTestId(searchTopBtn));
    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    const searchInput = screen.getByTestId(searchInputBar);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'b');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
    expect(fetch).toHaveBeenCalledTimes(fetchTimes);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b');
  });
});

describe('3-Testa se a busca por primeira letra funciona corretamente', () => {
  it('Testa se a aplicação exibe um alerta quando mais de 1 primeira letra é digitada',
    () => {
      const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
      renderPath('/drinks');
      userEvent.click(screen.getByTestId(searchTopBtn));
      const firstLetterRadio = screen.getByLabelText(/first letter/i);
      const searchInput = screen.getByTestId(searchInputBar);
      const searchButton = screen.getByRole('button', { name: 'Search' });
      userEvent.type(searchInput, 'ba');
      userEvent.click(firstLetterRadio);
      userEvent.click(searchButton);
      expect(alert).toHaveBeenCalledTimes(1);
    });
});
describe('4-Testa o funcionamento da barra de busca na pagina de foods', () => {
  it('Testa a busca por ingredientes da barra de busca', () => {
    renderPath('/foods');
    userEvent.click(screen.getByTestId(searchTopBtn));
    const ingredientRadio = screen.getByLabelText(/Ingredient/i);
    const searchInput = screen.getByTestId(searchInputBar);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'beef');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);
    expect(fetch).toHaveBeenCalledTimes(fetchTimes);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=beef');
  });
  it('Testa a busca por nome da barra de busca', () => {
    renderPath('/foods');
    userEvent.click(screen.getByTestId(searchTopBtn));
    const nameRadio = screen.getByLabelText(/name/i);
    const searchInput = screen.getByTestId(searchInputBar);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'pork');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    expect(fetch).toHaveBeenCalledTimes(fetchTimes);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=pork');
  });
  it('Testa a busca por primeira letra da barra de busca', () => {
    renderPath('/foods');
    userEvent.click(screen.getByTestId(searchTopBtn));
    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    const searchInput = screen.getByTestId(searchInputBar);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    userEvent.type(searchInput, 'h');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
    expect(fetch).toHaveBeenCalledTimes(fetchTimes);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=h');
  });
});
