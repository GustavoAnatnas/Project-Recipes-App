import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';

const footerName = 'footer';
const number = 3;

describe('1-Testa a implementação e funcionamento do footer', () => {
  it('Testa se o footer renderizado no fim da página', () => {
    renderPath('/foods');
    const footer = screen.getByTestId(footerName);
    expect(footer).toBeInTheDocument();
  });
  it('Testa se o footer renderiza 3 icones', () => {
    renderPath('/foods');
    const footer = screen.getByTestId(footerName);
    expect(footer.childNodes).toHaveLength(number);
  });
});

describe('2-Testa o funcionamento dos icones do footer', () => {
  it('Testa se o icone de bebidas leva a página correta', () => {
    const { history } = renderPath('/foods');
    userEvent.click(screen.getByAltText('drinkIcon'));
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  it('Testa se o icone de comidas leva a página correta', () => {
    const { history } = renderPath('/drinks');
    userEvent.click(screen.getByAltText('mealIcon'));
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
  it('Testa se o icone de explore leva a página correta', () => {
    const { history } = renderPath('/foods');
    userEvent.click(screen.getByAltText('exploreIcon'));
    const { pathname } = history.location;
    expect(pathname).toBe('/explore');
  });
});

describe('3-Testa se o footer existe nas rotas corretas', () => {
  const routes = ['/foods', '/drinks', '/explore', '/explore/foods',
    '/explore/drinks', '/explore/foods/ingredients', '/explore/drinks/ingredients',
    '/explore/foods/nationalities', '/profile'];
  routes.forEach((route) => {
    it(`Testa se o footer existe na rota ${route}`, () => {
      const { history } = renderPath(route);
      const { pathname } = history.location;
      const footer = screen.getByTestId(footerName);
      expect(pathname).toBe(route);
      expect(footer).toBeInTheDocument();
      expect(footer.childNodes).toHaveLength(number);
    });
  });
});
