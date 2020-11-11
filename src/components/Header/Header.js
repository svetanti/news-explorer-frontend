import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../ui/Logo/Logo';
import MenuIcon from '../ui/MenuIcon/MenuIcon';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  const { isLoggedIn, onClick, onSignOut } = props;

  const [isMenuOpened, setMenuOpened] = useState(false);
  const { pathname } = useLocation();

  const headerClassName = `header ${isMenuOpened ? 'header_mobile' : ''}`;
  const navigationClassName = `${isMenuOpened ? 'header__nav_mobile' : ''}`;

  const handleMenuOpen = () => setMenuOpened(!isMenuOpened);

  return (
    <header className={headerClassName}>
      <Logo
        isMenuOpened={isMenuOpened}
        pathname={pathname} />
      <MenuIcon
        isMenuOpened={isMenuOpened}
        onMenuClick={handleMenuOpen}
        pathname={pathname} />
      <Navigation
        navigationClassName={navigationClassName}
        isLoggedIn={isLoggedIn}
        isMenuOpened={isMenuOpened}
        pathname={pathname}
        onClick={onClick}
        onSignOut={onSignOut} />
    </header >
  )
}