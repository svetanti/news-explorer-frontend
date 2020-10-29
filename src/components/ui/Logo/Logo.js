import React from 'react';
import Link from '../Link/Link'

export default function Logo({ isMenuOpened, pathname }) {
  const logoClassName = `logo ${(pathname === '/' || isMenuOpened) ? 'logo_white' : 'logo_dark'}`;

  return (
    <Link path='/' linkClassName='logo__link'>
      <h1 className={logoClassName}> NewsExplorer</ h1>
    </Link>
  )
}