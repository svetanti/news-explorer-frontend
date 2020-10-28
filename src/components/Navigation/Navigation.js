import React from 'react';
import Link from '../ui/Link/Link';

export default function Navigation(props) {
  const { isLoggedIn, isMenuOpened, navigationClassName, pathname } = props;
  const linkClassName = `nav__item ${(pathname === '/' || isMenuOpened) ? 'nav__item_white' : 'nav__item_dark'}`;

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
    </nav >
  )
}