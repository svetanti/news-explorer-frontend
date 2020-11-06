import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';

export default function SavedNews(props) {
  const {
    savedNews,
    userName,
    pathname,
    isLoggedIn,
    onCardClick } = props;

  return (
    <div className='saved-news'>
      <SavedNewsHeader
        savedNews={savedNews}
        userName={userName}
        isLoggedIn={isLoggedIn} />
      <NewsCardList
        newsToRender={savedNews}
        savedNews={savedNews}
        pathname={pathname}
        isLoggedIn={isLoggedIn}
        onCardClick={onCardClick} />
    </div >
  )
}