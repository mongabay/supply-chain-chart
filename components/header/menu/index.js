import React, { useState } from 'react';

import { TOOLS } from '../constants';
import cx from 'classnames';
import Icon from 'components/icon';

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="row justify-content-start justify-content-sm-center">
      <button className="btn btn-link p-0" onClick={() => setIsOpen(true)}>
        <span className="sr-only">open navigation menu</span>
        <Icon name="menu" className="header__menu__icon" />
      </button>
      <div
        className={cx('header__menu__mask', {
          '--open': isOpen,
          '--close': !isOpen,
        })}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={cx('header__menu__content', {
          '--open': isOpen,
          '--close': !isOpen,
        })}
      >
        <div className="header__menu__content__wrap">
          <button
            className="header__menu__content__wrap__close-btn btn btn-link p-0"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">close navigation menu</span>
            <Icon name="close" className="header__menu__content__wrap__close-btn__icon" />
          </button>
          <p className="header__menu__content__wrap__title">Mongabay Chart Tools</p>
          <ul className="space-y-6">
            {TOOLS.map(({ name, url, id, color }) => (
              <li key={name}>
                <a target="_blank" rel="noopener noreferrer" href={url}>
                  <div
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    <Icon name={id} />
                  </div>
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <div className="header__menu__content__wrap__buttons">
            {/* TODO: add links */}
            <button className="btn btn-dark text-white bg-dark-gray shadow-none">
              Get in touch
            </button>
            <button className="btn btn-light text-dark-gray border border-gray-dark shadow-none">
              Find out more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
