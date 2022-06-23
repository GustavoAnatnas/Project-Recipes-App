import React from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';

function Login() {
  const history = useHistory();
  const { email, password, setEmail, setPassword } = React.useContext(MyContext);

  const disabledLoginBttn = () => {
    const minPassword = 7;
    const emailRequirement = /\S+@\S+\.\S+/;

    if (password.length >= minPassword && emailRequirement.test(email)) {
      return false;
    }
    return true;
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', email);
    history.push('/foods');
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          value={ email }
          id="name"
          data-testid="email-input"
          placeholder="Email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="Password">
        Senha
        <input
          type="password"
          name="password"
          id="Password"
          value={ password }
          data-testid="password-input"
          placeholder="Senha"
          onChange={ ({ target }) => setPassword(target.value) }

        />
      </label>
      <input
        type="button"
        value="Login"
        data-testid="login-submit-btn"
        disabled={ disabledLoginBttn() }
        onClick={ handleClick }
      />
    </form>
  );
}

export default Login;
