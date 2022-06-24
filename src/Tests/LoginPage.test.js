import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/RenderPath';

const correctEmail = 'playerOne@gmail.com';
const correctPass = '1234567';

describe('1-Testa se a tela é renderizada corretamente com seus elementos', () => {
  it('Renderiza os inputs de Email e Senha', () => {
    renderPath('/');
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/senha/i);
    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
  });
  it('Testa se o botão de login é renderizado e está desabilitado', () => {
    renderPath('/');
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  it('Testa se ao digitar as informações corretas o botão de login é habilitado', () => {
    renderPath('/');
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    userEvent.type(emailInput, correctEmail);
    expect(loginButton).toBeDisabled();
    userEvent.type(passInput, correctPass);
    expect(emailInput).toHaveValue(correctEmail);
    expect(passInput).toHaveValue(correctPass);
    expect(loginButton).not.toBeDisabled();
  });
});

describe('2-Testa o funcionamento do localStorage', () => {
  it('Testa se ao realizar o login as informação são salvas no localStorage', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    const numberOfCalls = 3;
    renderPath('/');
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/senha/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    userEvent.type(emailInput, correctEmail);
    userEvent.type(passInput, correctPass);
    userEvent.click(loginButton);
    expect(setItem).toHaveBeenCalled();
    expect(setItem).toHaveBeenCalledTimes(numberOfCalls);
  });
});
