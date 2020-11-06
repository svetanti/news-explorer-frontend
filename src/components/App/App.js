import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import * as newsApi from '../../utils/NewsApi'
import * as mainApi from '../../utils/MainApi';

export default function App() {

  const escape = require('escape-html');

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [disabled, setDisabled] = useState(true);


  const [news, setNews] = useState([]);
  const [savedNews, setSavedNews] = useState([]);


  const [isSearchError, setSearchError] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSearchOk, setSearchOk] = useState(false);


  const [currentUser, setCurrentUser] = useState({});

  const [isMenuOpened, setMenuOpened] = useState(false);
  const [userName, setUserName] = useState('');

  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserName(res.data.name);
          setCurrentUser(res.data);
          getSavedNews();
        })
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    const localStorageNews = JSON.parse(localStorage.getItem('news'));
    if (localStorageNews && localStorageNews.length) {
      setNews(localStorageNews);
      setSearchOk(true);
    }
  }, []);

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

  function handleShowMore() {
    setCurrentRow(currentRow + 1);
  };

  function handleLoginPopupOpen() {
    setLoginOpen(true);
  };

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserName('');
    history.push('/');
  };

  function handleAuth() {
    isLoggedIn ? handleSignOut() : handleLoginPopupOpen();
  };

  function handlePopupsClose() {
    setRegisterOpen(false);
    setLoginOpen(false);
    setTooltipOpen(false);
    setAuthError('');
  };

  function handleTogglePopup() {
    setAuthError('');
    setLoginOpen(!isLoginOpen);
    setRegisterOpen(!isRegisterOpen);
  };

  function handleOpenLogin() {
    setAuthError('');
    setTooltipOpen(false);
    setLoginOpen(true);
  };

  function handleNewsSearch(keyword, setErrorMessage) {
    if (!keyword) {
      setErrorMessage('Нужно ввести ключевое слово');
      return;
    }
    setLoading(true);
    setSearchOk(false);
    setNews([]);
    setCurrentRow(0);
    newsApi
      .getNews(keyword)
      .then((res) => {
        setSearchOk(true);
        const news = res.articles.map((item) => ({ ...item, keyword: keyword }));
        localStorage.setItem('news', JSON.stringify(news));
        setSearchError(false);
        setNews(news);
        setLoading(false);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке новостей: ${err}`);
        setLoading(false);
        setSearchError(true);
      });
  };

  function handleRegister(email, password, name) {
    mainApi.register(email, escape(password), name)
      .then((res) => {
        console.log(res);
        setRegisterOpen(false);
        setTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message);
      });
  };

  function handleLogin(email, password) {
    setAuthError('');
    mainApi.authorize(email, escape(password))
      .then((data) => {
        mainApi.getUserInfo(data)
          .then((res) => {
            setUserName(res.data.name);
            setCurrentUser(res.data);
          })
          .catch((err) => {
            console.log(err);
            setAuthError(err.message);
          });
        setLoggedIn(true);
        setLoginOpen(false);
        getSavedNews();
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message);
      });
  };

  function getSavedNews() {
    mainApi.getSavedNews()
      .then((res) => {
        return res.json();
      })
      .then((news) => {
        setSavedNews(news.data);
      })
      .catch(err => console.log(err));
  }

  function handleArticleClick(article) {
    const saved = savedNews.find((i) => i.publishedAt === article.publishedAt && i.title === article.title);
    if (!saved) {
      mainApi.saveArticle(article)
        .then((res) => {
          return res.json();
        })
        .then(newArticle => {
          setSavedNews([newArticle.data, ...savedNews]);
          setSaved(true);
        })
        .catch((err) => console.log(err));
      return;
    }
    handleDeleteArticle(saved);
  }

  function handleDeleteArticle(article) {
    mainApi.deleteArticle(article._id)
      .then(() => setSavedNews(savedNews.filter((item) => item._id !== article._id)))
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  return (
    <div className='app'>
      <Header
        isLoggedIn={isLoggedIn}
        isMenuOpened={isMenuOpened}
        onMenuOpen={handleMenuOpen}
        userName={userName}
        pathname={pathname}
        onClick={handleAuth} />
      <Switch>
        <Route exact path='/'>
          <Main
            onSearch={handleNewsSearch}
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            isError={isSearchError}
            pathname={pathname}
            onCardClick={handleArticleClick}
            onShowMore={handleShowMore}
            isSearchOk={isSearchOk}
            news={news}
            savedNews={savedNews}
            currentRow={currentRow} />
        </Route>
        <Route path='/saved-news'>
          <SavedNews
            isLoggedIn={isLoggedIn}
            savedNews={savedNews}
            pathname={pathname}
            userName={userName}
            onCardClick={handleDeleteArticle} />
        </Route>
      </Switch>
      <Footer />

      <Register
        isOpen={isRegisterOpen}
        onClose={handlePopupsClose}
        onChangeForm={handleTogglePopup}
        disabled={disabled}
        onRegister={handleRegister}
        authError={authError} />
      <Login
        isOpen={isLoginOpen}
        onClose={handlePopupsClose}
        onChangeForm={handleTogglePopup}
        disabled={disabled}
        authError={authError}
        onLogin={handleLogin} />
      <InfoTooltip
        isOpen={isTooltipOpen}
        onClose={handlePopupsClose}
        onChangeForm={handleOpenLogin} />
    </div>
  );
}

