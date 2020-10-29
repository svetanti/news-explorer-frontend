import React from 'react';
import { useLocation } from 'react-router-dom';

export default function MenuIcon({ onMenuClick, isMenuOpened }) {
  const { pathname } = useLocation();
  const menuClassName = `
    menu-icon 
    ${isMenuOpened ? 'menu-icon_opened' : 'menu-icon_closed'}
    ${pathname === '/' ? 'menu-icon_white' : 'menu-icon_dark'}`;

  return (
    <button
      className={menuClassName}
      onClick={onMenuClick}>
      <span></span>
    </button>
  )
}