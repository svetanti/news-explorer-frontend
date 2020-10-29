import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { Api } from '../../utils/NewsApi';
import { apiOptions } from '../../utils/options';

export default function App() {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [news, setNews] = useState();

  // Временный юзернейм
  const [userName, setUserName] = useState('Жак-Ив Кусь');

  const { pathname } = useLocation();

  useEffect(() => {
    function closeOnEsc(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        handlePopupsClose();
      }
    }
    document.addEventListener("keyup", closeOnEsc);

    return () => {
      document.removeEventListener("keyup", closeOnEsc);
    };
  }, []);

  function handleMenuOpen() {
    setMenuOpened(!isMenuOpened);
  };

  function handleCardButtonClick() {
    if (isLoggedIn) {
      setSaved(!isSaved);
    }
  };

  function handleShowMore() {
    setCurrentRow(currentRow + 1);
  }

  function handleLoginPopupOpen() {
    setLoginOpen(true);
  }
  function handleRegisterPopupOpen() {
    setRegisterOpen(true);
  }
  function handleTooltipPopupOpen() {
    setTooltipOpen(true);
  }

  function handlePopupsClose() {
    setRegisterOpen(false);
    setLoginOpen(false);
    setTooltipOpen(false);
  }

  function handleTogglePopup() {
    setLoginOpen(!isLoginOpen);
    setRegisterOpen(!isRegisterOpen);
  };

  function handleNewsSearch(keyword, setErrorMessage) {
    if (!keyword) {
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }
    setLoading(true);
    setNews();
    const api = new Api(keyword, apiOptions);
    api
      .getNews()
      .then((news) => {
        setNews(news.articles);
        setLoading(false);
      })
      .catch((err) => console.log(`Ошибка при загрузке новостей: ${err}`));
  }

  return (
    <div className='app'>
      <Header
        isLoggedIn={isLoggedIn}
        isMenuOpened={isMenuOpened}
        onMenuOpen={handleMenuOpen}
        userName={userName}
        pathname={pathname}
        onClick={handleLoginPopupOpen} />
      <Switch>
        <Route exact path='/'>
          <Main
            onSearch={handleNewsSearch}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            isSaved={isSaved}
            pathname={pathname}
            handleCardButtonClick={handleCardButtonClick}
            onShowMore={handleShowMore}
            news={news}
            currentRow={currentRow} />
        </Route>
        <Route path='/saved-news'>
          <SavedNews
            news={news}
            pathname={pathname}
            userName={userName} />
        </Route>
      </Switch>
      <Footer />

      <Register
        isOpen={isRegisterOpen}
        onClose={handlePopupsClose}
        onChangeForm={handleTogglePopup}
        disabled={disabled} />
      <Login
        isOpen={isLoginOpen}
        onClose={handlePopupsClose}
        onChangeForm={handleTogglePopup}
        disabled={disabled} />
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={handlePopupsClose} />
    </div >
  );
}

