import React, { useContext } from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import { NewsContext } from '../../contexts/NewsContext';

export default function SavedNews(props) {
  const { isLoggedIn, onCardClick } = props;

  const { savedNews } = useContext(NewsContext);

  return (
    <div className='saved-news'>
      <SavedNewsHeader
        isLoggedIn={isLoggedIn} />
      <NewsCardList
        newsToRender={savedNews}
        isLoggedIn={isLoggedIn}
        onCardClick={onCardClick} />
    </div >
  )
}