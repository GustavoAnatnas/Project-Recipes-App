import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';

const profileId = 'profile-top-btn';
const searchId = 'search-top-btn';

describe('1-Testa a implementação do Header', () => {
  it('Testa se o Header é gerado corretamente na tela de comidas', () => {
    renderPath('/foods');
    const pageTitle = screen.getByRole('heading', { level: 2, name: /foods/i });
    const profileButton = screen.getByTestId(profileId);
    const searchButton = screen.getByTestId(searchId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('Testa se o Header é gerado corretamente na tela de bebidas', () => {
    renderPath('/drinks');
    const pageTitle = screen.getByRole('heading', { level: 2, name: /drinks/i });
    const profileButton = screen.getByTestId(profileId);
    const searchButton = screen.getByTestId(searchId);
    expect(pageTitle).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
  it('Testa se o botão de perfil funciona corretamente', () => {
    const { history } = renderPath('/drinks');
    const profileButton = screen.getByTestId(profileId);
    userEvent.click(profileButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  it('Testa se o botão de search funciona corretamente', () => {
    renderPath('/drinks');
    const searchButton = screen.getByTestId(searchId);
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });
});

describe('2-Verifica se o Header existe nas rotas corretas', () => {
  const routes = ['/explore', '/explore/foods',
    '/explore/drinks', '/explore/foods/ingredients', '/explore/drinks/ingredients',
    '/explore/foods/nationalities', '/profile', '/done-recipes', '/favorite-recipes'];
  routes.forEach((route) => {
    it(`Testa se o Header existe na rota ${route}`, () => {
      renderPath(route);
      const profileButton = screen.getByTestId(profileId);
      expect(profileButton).toBeInTheDocument();
    });
  });
});
