import { screen } from '@testing-library/react';
import renderPath from './helpers/RenderPath';

describe('1-Testa a página de "page not found"', () => {
  it('Testa se ao utilizar uma url invalida o usuario é direcionado a pagina de notFound',
    () => {
      const { history } = renderPath('/url-invalida');
      const title = screen.getByRole('heading', { name: /page not found/i, level: 2 });
      const { pathname } = history.location;
      expect(title).toBeInTheDocument();
      expect(pathname).toBe('/page-not-found');
    });
});
