import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';
import styles from '../Css/Profile.module.css';

function Profile({ history }) {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  const [userEmail, setUserEmail] = useState();

  const getUserEmail = () => {
    const result = JSON.parse(localStorage.getItem('user'));
    if (result) setUserEmail(result.email);
  };

  const onLogoutButtonClick = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    setHeaderTitle('Profile');
    setSearchHiden(false);
    getUserEmail();
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <div>
      <Header />
      <section className={ styles.section }>
        <h2 data-testid="profile-email">{ `Email: ${userEmail}` }</h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => onLogoutButtonClick() }
        >
          Logout
        </button>
      </section>
      <FooterMenu />
    </div>

  );
}

Profile.propTypes = {
  history: PropTypes.shape(PropTypes.any).isRequired,
};

export default Profile;
