import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NewsContext } from '../../contexts/NewsContext';

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

  const articlesDeclension = ['статья', 'статьи', 'статей'][
    savedNews.length === 0 && 0
      && savedNews.length % 10 === 1 && savedNews.length % 100 !== 11
      ? 0
      : savedNews.length % 10 >= 2
        && savedNews.length % 10 <= 4 && (savedNews.length % 100 < 10 || savedNews.length % 100 >= 20)
        ? 1
        : 2];

  const numberDeclension = ['му', 'м', 'и'][
    keywordsSorted.slice(3).length % 10 === 1
      && keywordsSorted.slice(3).length % 100 !== 11
      ? 0
      : keywordsSorted.slice(3).length % 10 >= 2
        && keywordsSorted.slice(3).length % 10 <= 4
        && (keywordsSorted.slice(3).length % 100 < 10 || keywordsSorted.slice(3).length % 100 >= 20)
        ? 1
        : 2];

  const adjectiveDeclination = ['другому', 'другим'][
    keywordsSorted.slice(3).length % 10 === 1
      && keywordsSorted.slice(3).length % 100 !== 11
      ? 0
      : 1];

  const keywordsToRender = keywordsSorted.length <= 3
    ? keywordsSorted.join(', ')
    : `${keywordsSorted.slice(0, 3).join(', ')} и ${keywordsSorted.slice(3).length}-${numberDeclension} ${adjectiveDeclination}`;

  return (
    <div className='saved-news-header'>
      <p className='saved-news-header__title'>Сохранённые статьи</p>
      <h2 className='saved-news-header__heading'>
        {currentUser.name}, у вас {savedNews.length} сохранённых {articlesDeclension}</h2>
      <p className='saved-news-header__keywords-list'>По ключевым словам:&nbsp;
      <span className='saved-news-header__keywords'>{keywordsToRender}</span></p>
    </div>
  )
}