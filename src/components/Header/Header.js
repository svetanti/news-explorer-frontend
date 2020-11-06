import React, { useContext } from 'react';
import Logo from '../ui/Logo/Logo';
import Button from '../ui/Button/Button';
import MenuIcon from '../ui/MenuIcon/MenuIcon';
import Navigation from '../Navigation/Navigation';
import SignOutIcon from '../ui/SignOutIcon/SignOutIcon';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useLocation } from 'react-router-dom';

export default function Header(props) {
  const { isLoggedIn, isMenuOpened, onMenuOpen, onClick } = props;

  const currentUser = useContext(CurrentUserContext);
  const { pathname } = useLocation();

  const headerClassName = `header ${isMenuOpened ? 'header_mobile' : ''}`;
  const navigationClassName = `${isMenuOpened ? 'header__nav_mobile' : ''}`;
  const buttonClassName = `header__button
    ${isMenuOpened ? 'header__button_mobile' : ''}
    ${(pathname === '/' || isMenuOpened)
      ? 'header__button_white'
      : 'header__button_dark'}`;

  return (
    <header className={headerClassName}>
      <Logo
        isMenuOpened={isMenuOpened}
        pathname={pathname} />
      <MenuIcon
        isMenuOpened={isMenuOpened}
        onMenuClick={onMenuOpen}
        pathname={pathname} />
      <Navigation
        navigationClassName={navigationClassName}
        isLoggedIn={isLoggedIn}
        isMenuOpened={isMenuOpened}
        pathname={pathname} />

      <Button
        buttonClassName={buttonClassName}
        isMenuOpened={isMenuOpened}
        onClick={onClick}>
        <span className='header__button-text'>{isLoggedIn ? currentUser.name : 'Авторизоваться'}</span>
        {
          isLoggedIn &&
          <SignOutIcon />
        }
      </Button>
    </header >

  )
}