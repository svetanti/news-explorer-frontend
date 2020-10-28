import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function SavedNews(props) {
  const {
    news,
    userName,
    pathname,
    isLoggedIn,
    isSaved,
    handleCardButtonClick } = props;

  return (
    <div className='saved-news'>
      <SavedNewsHeader
        news={news}
        userName={userName} />
      <NewsCardList
        newsToRender={news}
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        isSaved={isSaved}
        handleCardButtonClick={handleCardButtonClick} />
    </div >
  )
}