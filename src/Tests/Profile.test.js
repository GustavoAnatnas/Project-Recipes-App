import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';

const user = { email: 'TryberTest@hotmail.com' };

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('1-Testa a página de perfil', () => {
  test('Testa se a pagina de perfil é rendizada corretamente', () => {
    const { history } = renderPath('/profile');
    const title = screen.getByRole('heading', { name: /profile/i, level: 2 });
    const { pathname } = history.location;
    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/profile');
  });
  test('Testa se o email do usuario é pego do localStorage e aparece na tela', () => {
    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    renderPath('/profile');
    const userEmail = screen
      .getByRole('heading', { name: /trybertest@hotmail.com/i, level: 2 });
    expect(getItem).toHaveBeenCalled();
    expect(userEmail).toBeInTheDocument();
    getItem.mockRestore();
  });
});
describe('2-Testa o funcionamento dos botões da página de perfil', () => {
  test('Testa se são gerados 3 botões na tela de perfil', () => {
    renderPath('/profile');
    const doneButton = screen.getByRole('button', { name: /done recipes/i });
    const favButton = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(doneButton).toBeInTheDocument();
    expect(favButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
  test('Testa o funcionamento do botão de Done Recipes', () => {
    const { history } = renderPath('/profile');
    const doneButton = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  test('Testa o funcionamento do botão de Favorite Recipes', () => {
    const { history } = renderPath('/profile');
    const favButton = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('Testa o funcionamento do botão de Logout', () => {
    const clearLocal = jest.spyOn(Storage.prototype, 'clear');
    const { history } = renderPath('/profile');
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);
    expect(clearLocal).toHaveBeenCalled();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    clearLocal.mockRestore();
  });
});
