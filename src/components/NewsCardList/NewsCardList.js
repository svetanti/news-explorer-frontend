import React from 'react';
import NewsCard from '../NewsCard/NewsCard'

export default function NewsCardList(props) {
  const {
    isLoggedIn,
    onCardClick,
    newsToRender,
    savedNews
  } = props;

  return (
    <section className='news-card-list'>
      <ul className='news-card-list__wrapper'>
        {newsToRender.map((article, index) => (
          <NewsCard
            article={article}
            key={index}
            isLoggedIn={isLoggedIn}
            savedNews={savedNews}
            onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  )
}