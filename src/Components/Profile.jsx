import React, { useContext, useEffect } from 'react';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';

function Profile() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Profile');
    setSearchHiden(false);
  }, [setHeaderTitle, setSearchHiden]);

  return (
    <div>
      <Header />
      <FooterMenu />
    </div>

  );
}

export default Profile;
