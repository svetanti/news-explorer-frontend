import React from 'react';
import CardButtonIcon from '../ui/CardButtonIcon/CardButtonIcon';

export default function NewsCard(props) {
  const { isLoggedIn, isSaved, handleCardButtonClick, pathname, article } = props;

  const { title, description, publishedAt, url, urlToImage, source } = article;

  const options = {
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(publishedAt);
  const dayAndMonth = date.toLocaleString('ru', options);
  const fullDate = dayAndMonth + ', ' + date.getFullYear();

  const tooltipText =
    (!isLoggedIn && pathname === '/')
      ? 'Войдите, чтобы сохранять статьи'
      : 'Убрать из сохранённых';

  return (
    <li className='card'>
      { pathname === '/saved-news' &&
        < span className='card__element card__keyword'>Природа</span>
      }
      <button
        type='button'
        className='card__element card__button'
        onClick={handleCardButtonClick}>
        <CardButtonIcon
          pathname={pathname}
          isSaved={isSaved} />
      </button>
      <span className='card__element card__tooltip'>{tooltipText}</span>
      <div className='card__img-wrapper'>
        <img
          src={urlToImage}
          alt={title}
          className='card__image' />
      </div>
      <div className='card__content'>
        <span className='card__date'>{fullDate}</span>
        <h2 className='card__title'>{title}</h2>
        <p className='card__text'>{description}</p>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='card__source'>{source.name}</a>
      </div>
    </li >
  )
}