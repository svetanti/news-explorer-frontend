import React from 'react';
import NewsCard from '../NewsCard/NewsCard'

export default function NewsCardList(props) {
  const {
    isSaved,
    isLoggedIn,
    pathname,
    handleCardButtonClick,
    newsToRender
  } = props;

  return (
    <section className='news-card-list'>
      <ul className='news-card-list__wrapper'>
        {newsToRender.map((article, index) => (
          <NewsCard
            article={article}
            key={index}
            isLoggedIn={isLoggedIn}
            isSaved={isSaved}
            pathname={pathname}
            handleCardButtonClick={handleCardButtonClick} />
        ))}
      </ul>
    </section>
  )
}