import React from 'react';
import Link from '../ui/Link/Link';
import ghPath from '../../images/github.svg';
import fbPath from '../../images/fb.svg';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy; {(new Date().getFullYear())} Supersite, Powered by News API</p>
      <ul className='footer__links'>
        <li>
          <Link path='/' linkClassName='footer__link'>Главная</ Link>
        </li>
        <li>
          <a
            className='footer__link'
            href='https://praktikum.yandex.ru/'
            target='_blank'
            rel='noopener noreferrer'>Яндекс.Практикум</a>
        </li>
      </ul>
      <ul className='footer__social'>
        <li>
          <a
            href='https://github.com/svetanti'
            target='_blank'
            rel='noopener noreferrer'>
            <img
              className='footer__social-icon'
              src={ghPath} alt='Ссылка на GitHub' /></a>
        </li>
        <li>
          <a
            href='https://www.facebook.com/svetlana.antipova.399'
            target='_blank'
            rel='noopener noreferrer'>
            <img className='footer__social-icon' src={fbPath} alt='Ссылка на Facebook' /></a>
        </li>
      </ul>
    </footer >
  )
}