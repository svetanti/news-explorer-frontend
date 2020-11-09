import React, { useContext } from 'react';
import Link from '../ui/Link/Link';
import Button from '../ui/Button/Button';
import SignOutIcon from '../ui/SignOutIcon/SignOutIcon';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Navigation(props) {
  const { isLoggedIn, isMenuOpened, navigationClassName, pathname, onClick, onSignOut } = props;

  const currentUser = useContext(CurrentUserContext);

  const linkClassName = `nav__item ${(pathname === '/' || isMenuOpened) ? 'nav__item_white' : 'nav__item_dark'}`;
  const buttonClassName = `${linkClassName} nav__button ${isMenuOpened ? 'nav__button_mobile' : ''}`;

  return (
    <nav className={`nav ${navigationClassName}`}>
      <Link
        linkClassName={linkClassName}
        activeLinkClassName='nav__item_active'
        path='/'>Главная</Link>
      {
        isLoggedIn &&
        (<Link
          linkClassName={linkClassName}
          activeLinkClassName='nav__item_active'
          path='/saved-news'>Сохранённые статьи</Link>)
      }
      <Button
        buttonClassName={buttonClassName}
        isMenuOpened={isMenuOpened}
        onClick={isLoggedIn ? onSignOut : onClick}>
        <span className='nav__button-text'>{isLoggedIn ? currentUser.name : 'Авторизоваться'}</span>
        {
          isLoggedIn &&
          <SignOutIcon />
        }
      </Button>
    </nav >
  )
}