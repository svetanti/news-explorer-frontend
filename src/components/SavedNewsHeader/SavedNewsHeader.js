import React from 'react';

export default function SavedNewssaved(props) {
  const { news, userName } = props;

  return (
    <div className='saved-news-header'>
      <p className='saved-news-header__title'>Сохранённые статьи</p>
      <h2 className='saved-news-header__heading'>{userName}, у вас {news.length} сохранённых статей</h2>
      <p className='saved-news-header__keywords-list'>По ключевым словам:&nbsp;
      <span className='saved-news-header__keywords'>Природа, Тайга и 2-м другим</span></p>
    </div>
  )
}