import React, { useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Button from '../ui/Button/Button';
import { NewsContext } from '../../contexts/NewsContext';

export default function Main(props) {
  const {
    onSearch,
    isLoggedIn,
    isLoading,
    onCardClick,
    onShowMore,
    isSearchOk,
    currentRow,
    isError } = props;

  const { news, savedNews } = useContext(NewsContext);

  const cardsPerRow = 3;
  const newsToRender = news.slice(0, (currentRow + 1) * cardsPerRow);

  return (
    <section className='main'>
      <SearchForm onSearch={onSearch} />
      {
        isLoading && (<Preloader />)
      }
      {
        isSearchOk &&
        <div className='main__news-container'>
          {
            newsToRender.length ? (<>
              <h2 className='main__news-heading'>Результаты поиска</h2>
              <NewsCardList
                newsToRender={newsToRender}
                isLoggedIn={isLoggedIn}
                savedNews={savedNews}
                onCardClick={onCardClick}
                currentRow={currentRow} />
              {
                newsToRender.length !== news.length &&
                (<Button buttonClassName='main__show-more' onClick={onShowMore}>Показать еще</Button>)
              }
            </>)
              : (<div className='main__not-found'>
                <span className='main__not-found-icon'></span>
                <h3 className='main__not-found-heading'>Ничего не найдено</h3>
                <p className='main__not-found-text'>К сожалению по вашему запросу ничего не найдено.</p>
              </div>)
          }
        </div>
      }
      {
        isError && (<div className='main__news-container'>
          <div className='main__not-found'>
            <h3 className='main__not-found-heading'>Во время запроса произошла ошибка.</h3>
            <p className='main__not-found-text'>
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз</p>
          </div>
        </div>)
      }
      <About />
    </section>
  )
}
