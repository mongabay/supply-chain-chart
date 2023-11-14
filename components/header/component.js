import React from 'react';
import './style.scss';
import HeaderMenu from './menu';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={`${process.env.BASE_PATH ?? ''}/images/mongabay-logo-white.png`} alt="Mongabay" />
      </div>
      <HeaderMenu />
    </header>
  );
};

export default Header;
