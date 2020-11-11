import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NewsContext } from '../../contexts/NewsContext';
import { articlesDeclension, numberDeclension, adjectiveDeclination } from '../../utils/utils';

export default function SavedNewssaved(props) {
  const { isLoggedIn } = props;
  const currentUser = useContext(CurrentUserContext);
  const { savedNews } = useContext(NewsContext);

  const keywords = isLoggedIn ? savedNews.map(item => item.keyword) : [];

  const keywordsSorted = [...new Set(keywords)]
    .map(value => {
      const item = {};
      item.keyword = value;
      item.quantity = keywords.filter(str => str === value).length;
      return item;
    })
    .sort((a, b) => b.quantity - a.quantity)
    .map(item => item.keyword);

  const keywordsToRender = keywordsSorted.length <= 3
    ? keywordsSorted.join(', ')
    : `${keywordsSorted
      .slice(0, 3)
      .join(', ')} и ${keywordsSorted
        .slice(3)
        .length}-${numberDeclension(keywordsSorted)} ${adjectiveDeclination(keywordsSorted)}`;

  return (
    <div className='saved-news-header'>
      <p className='saved-news-header__title'>Сохранённые статьи</p>
      <h2 className='saved-news-header__heading'>
        {currentUser.name}, у вас {savedNews.length} сохранённых {articlesDeclension(savedNews)}</h2>
      <p className='saved-news-header__keywords-list'>По ключевым словам:&nbsp;
      <span className='saved-news-header__keywords'>{keywordsToRender}</span></p>
    </div>
  )
}