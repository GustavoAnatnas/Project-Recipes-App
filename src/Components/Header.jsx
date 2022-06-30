import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/MyContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import InputSearch from './InputSearch';
import styles from '../Css/Header.module.css';

function Header() {
  const { headerTitle, searchHiden } = useContext(MyContext);
  const [inputHiden, setInputHiden] = useState(false);
  const history = useHistory();
  const searchClick = () => {
    setInputHiden(!inputHiden);
  };

  return (
    <div className={ styles.header }>
      <header>
        <button
          className={ styles.profileIcon }
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </button>
        <h2 data-testid="page-title">{headerTitle}</h2>
        { searchHiden
      && (
        <button
          type="button"
          onClick={ searchClick }
          className={ styles.searchIcon }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </button>)}
      </header>
      {inputHiden && <InputSearch />}
    </div>
  );
}

export default Header;
