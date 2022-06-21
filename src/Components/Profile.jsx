import React, { useContext, useEffect } from 'react';
import FooterMenu from './FooterMenu';
import Header from './Header';

function Profile() {
  const { setHeaderTitle, setSearchHiden } = useContext(MyContext);
  useEffect(() => {
    setHeaderTitle('Profile');
    setSearchHiden(false);
  }, []);

  return (
    <div>
      <Header />
      <FooterMenu />
    </div>

  );
}

export default Profile;
