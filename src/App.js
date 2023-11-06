import './App.css';
import React, { useState, useEffect, } from 'react';
import Header from './components/header/Header';
import Welcome from './components/welcome/Welcome';
import Logo from './Logo';
import SearchBar from './components/searchBar/SearchBar';
import MakingPlaylist from './components/makingPlaylist/MakingPlaylist';
import Footer from './components/footer/Footer.js';
// import {CLIENT_ID, CLIENT_SECRET} from './APIs/ids.env';

function App() {


  const [search, setSearch] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);

  const [token, setToken] = useState('');
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  // const REDIRECT_URI = 'https://jamcore.netlify.app';
  const REDIRECT_URI = 'http://localhost:3000/';

  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  let expirationTime = 0;
  const hash = window.location.hash;

  const logout = () => {
    window.location.hash = '';
    window.localStorage.removeItem('token');
    setToken('');
    window.localStorage.removeItem('expirationTime');
  }


  // -- SET TOKEN FROM HASH -- if there is a hash, but the token is not yet set. 
  if (!token && hash) {
    const hashToken = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1];
    setToken(hashToken);
    window.location.hash = '';
    window.localStorage.setItem('token', hashToken);
  }

  // -- SET LOCAL STORAGE TOKEN FROM STATE VARIABLE -- (if not yet set, if local deleted)
  if (token && !window.localStorage.getItem('token')) {
    window.localStorage.setItem('token', token);
  }

  // -- SET TOKEN FROM LOCAL STORAGE -- if the page has been reloaded, but the token has not timed out (is still in local storage)
  if (!token) {
    if (window.localStorage.getItem('token')) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  // -- SET EXPIRATION TIME WHEN WE HAVE TOKEN -- if there is not already an expiration time, and we have a token. 
  if (token && !window.localStorage.getItem('expirationTime')) {
    const getExpirationTime = Date.now() + 3600 * 1000;
    window.localStorage.setItem('expirationTime', getExpirationTime);
    expirationTime = window.localStorage.getItem('expirationTime');
  }

  // -- SET EXPIRATION TIME FROM LOCAL STORAGE -- (if reload, state lost)
  if (!expirationTime && window.localStorage.getItem('expirationTime')) {
    expirationTime = window.localStorage.getItem('expirationTime');
  }

  // if (expirationTime === 0) {
  // } else if (expirationTime > 0) {
  // }



  useEffect(() => {
    const checkTokenExpiration = () => {
      const currentTime = Date.now();
      let timeRemaining = 0;
      let timeRemainingInMins = 0;
      if (expirationTime - currentTime) {
        timeRemaining = expirationTime - currentTime;
      }
      if (timeRemaining > 0) {
        timeRemainingInMins = timeRemaining / 60000;
      }
      if (timeRemaining < 0) {
        timeRemainingInMins = 0;
      }
      if (timeRemaining < 0 || !window.localStorage.getItem('token')) {
        logout();
      }
    }
    const tokenCheckInterval = setInterval(checkTokenExpiration, 5000);
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [])


  return (
    <div className="App">

      <header className="App-header">
        <Logo />
        {token ?
          (<>
            <button className='spotifytBtn logOutBtn' onClick={logout} onChange={e => e.preventDefault()} >
              Log out
            </button>
          </>)
          :
          (<>
            <a className='spotifytBtn logInBtn' title='Log into Spotify (logs you out after 1 hour)' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-private playlist-modify`} >
              Log in to Spotify
            </a>
          </>)
        }
        <img src={require('./Spotify_Icon_RGB_Green.png')} className='spotifyLogo' alt='Spotify logo' />
      </header>

      <main >
        {!token ?
          (<>
            <Welcome />
          </>)
          :
          <>
            <Header/>
            <div>
              <SearchBar setSearch={setSearch} search={search} token={token} setSearchResponse={setSearchResponse} />
              <MakingPlaylist token={token} search={search} searchResponse={searchResponse} />
            </div>
          </>
        }
      </main>

      <footer className="App-footer">
        <Footer />
      </footer>

    </div>
  );
}

export default App;
