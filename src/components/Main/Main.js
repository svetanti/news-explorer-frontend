import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Button from '../ui/Button/Button';

export default function Main(props) {
  const {
    onSearch,
    isLoggedIn,
    isLoading,
    isSaved,
    pathname,
    handleCardButtonClick,
    onShowMore,
    news,
    currentRow } = props;

  const cardsPerRow = 3;
  const newsToRender = news.slice(0, (currentRow + 1) * cardsPerRow);

  return (
    <div className='main'>
      <SearchForm
        onSearch={onSearch} />
      {isLoading && (<Preloader />)}
      {news &&
        < div className='main__news-container'>
          {
            news.length ?
              (<>
                <h2 className='main__news-heading'>Результаты поиска</h2>
                <NewsCardList
                  newsToRender={newsToRender}
                  pathname={pathname}
                  isLoggedIn={isLoggedIn}
                  isSaved={isSaved}
                  handleCardButtonClick={handleCardButtonClick}
                  currentRow={currentRow} />
                <Button buttonClassName='main__show-more' onClick={onShowMore}>Показать еще</Button>
              </>)
              : (
                <div className='main__not-found'>
                  <span className='main__not-found-icon'></span>
                  <h3 className='main__not-found-heading'>Ничего не найдено</h3>
                  <p className='main__not-found-text'>К сожалению по вашему запросу ничего не найдено.</p>
                </div>)
          }
        </div>
      }
      <About />
    </div >
  )
}