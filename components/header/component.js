import React from 'react';
import './style.scss';
import HeaderMenu from './menu';

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="header__logo">
          <img
            className="logo"
            src={`${process.env.BASE_PATH ?? ''}/images/mongabay-logo-white.png`}
            alt="Mongabay"
          />
        </div>
        <div className="header__content">
          <p className="header__content__name">Trade Flow Map</p>
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
