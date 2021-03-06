import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NewsContext } from '../../contexts/NewsContext';
import * as newsApi from '../../utils/NewsApi'
import * as mainApi from '../../utils/MainApi';

export default function App() {
  const escape = require('escape-html');

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSearchError, setSearchError] = useState(false);
  const [isSearchOk, setSearchOk] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [news, setNews] = useState([]);
  const [savedNews, setSavedNews] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    (!isLoggedIn && pathname === '/saved-news') && setLoginOpen(true);
  }, [isLoggedIn, pathname]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res.data);
          getSavedNews();
        })
        .catch((err) => console.log(err));
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

  function handleShowMore() {
    setCurrentRow(currentRow + 1);
  };

  function handleLoginPopupOpen() {
    setLoginOpen(true);
  };

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setCurrentUser({});
    history.push('/');
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
        const news = res.articles.map((item) => ({ ...item, keyword }));
        setNews(news);
        localStorage.setItem('news', JSON.stringify(news));
        setSearchOk(true);
        setSearchError(false);
      })
      .catch((err) => {
        console.log(`Ошибка при загрузке новостей: ${err}`);
        setSearchError(true);
      })
      .finally(() => setLoading(false));
  };

  function handleRegister(email, password, name) {
    setDisabled(true);
    mainApi.register(email, escape(password), name)
      .then((res) => {
        setRegisterOpen(false);
        setTooltipOpen(true);
      })
      .catch((err) => setAuthError(err.message))
      .finally(() => setDisabled(false));
  };

  function handleLogin(email, password) {
    setDisabled(true);
    mainApi.authorize(email, escape(password))
      .then((data) => {
        mainApi.getUserInfo(data)
          .then((res) => setCurrentUser(res.data))
          .catch((err) => setAuthError(err.message));
        setLoggedIn(true);
        setLoginOpen(false);
        getSavedNews();
      })
      .catch((err) => setAuthError(err.message))
      .finally(() => setDisabled(false));
  };

  function getSavedNews() {
    mainApi.getSavedNews()
      .then((news) => setSavedNews(news.data))
      .catch(err => console.log(`Ошибка при загрузке сохранённых новостей: ${err.message}`));
  };

  function handleArticleClick(article) {
    if (!isLoggedIn) return setRegisterOpen(true);
    const saved = savedNews.find((i) => i.publishedAt === article.publishedAt && i.title === article.title);
    if (!saved) {
      mainApi.saveArticle(article)
        .then(newArticle => setSavedNews([newArticle.data, ...savedNews]))
        .catch((err) => console.log(err));
      return;
    }
    handleDeleteArticle(saved);
  };

  function handleDeleteArticle(article) {
    mainApi.deleteArticle(article._id)
      .then(() => setSavedNews(savedNews.filter((item) => item._id !== article._id)))
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <NewsContext.Provider value={{ news, savedNews }}>
        <div className='app'>
          <Header
            isLoggedIn={isLoggedIn}
            onClick={handleLoginPopupOpen}
            onSignOut={handleSignOut} />
          <Switch>
            <Route exact path='/'>
              <Main
                onSearch={handleNewsSearch}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                isError={isSearchError}
                onCardClick={handleArticleClick}
                onShowMore={handleShowMore}
                isSearchOk={isSearchOk}
                currentRow={currentRow} />
            </Route>
            <ProtectedRoute
              path='/saved-news'
              component={SavedNews}
              isLoggedIn={isLoggedIn}
              onCardClick={handleDeleteArticle} />
          </Switch>
          <Footer />

          <Register
            isOpen={isRegisterOpen}
            onClose={handlePopupsClose}
            onChangeForm={handleTogglePopup}
            onRegister={handleRegister}
            authError={authError} />
          <Login
            isOpen={isLoginOpen}
            onClose={handlePopupsClose}
            onChangeForm={handleTogglePopup}
            authError={authError}
            onLogin={handleLogin}
            disabled={disabled} />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={handlePopupsClose}
            onChangeForm={handleOpenLogin}
            disabled={disabled} />
        </div>
      </NewsContext.Provider>
    </CurrentUserContext.Provider >
  );
}

