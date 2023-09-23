import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './headerThings/Header';
import SearchBar from './searchBarThings/SearchBar';
import MakingPlaylist from './makingPlaylistThings/MakingPlaylist';
// import {CLIENT_ID, CLIENT_SECRET} from './APIs/ids.env';

function App() {

  const [search, setSearch] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);
  const [token, setToken] = useState('');
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ;

  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  let timeRemaining = 0;
  let expirationTime = 0;

  console.log('expirationTime', expirationTime)

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken('');
    timeRemaining = 0;
    window.localStorage.removeItem('expirationTime');
  }

  if (!token){
    if (window.localStorage.getItem('token')){
      setToken(window.localStorage.getItem('token'));
    }
  }
  

  useEffect(()=> {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (token && !window.localStorage.getItem('expirationTime')){
      const getExpirationTime = Date.now() + 3600 * 1000;
      window.localStorage.setItem('expirationTime', getExpirationTime);
      expirationTime = window.localStorage.getItem('expirationTime');
      console.log('NEW expirationTime', expirationTime)
    }

    if (token && window.localStorage.getItem('expirationTime')) {
      expirationTime = window.localStorage.getItem('expirationTime');
    }

    const checkTokenExpiration = () => {
      const currentTime = Date.now();
      // setTimeRemaining(expirationTime - currentTime);
      timeRemaining = expirationTime - currentTime;
      console.log('timeRemaining', timeRemaining);
      console.log('expirationTime', expirationTime)

      // window.localStorage.setItem('expirationTime', expirationTime);
      if (timeRemaining < 0 || !window.localStorage.getItem('token')){
        logout();
      }
    }

    if (!token && hash ) {
      token = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1];
      window.location.hash = '';
      window.localStorage.setItem('token', token);
      setToken(token);
    } 

    const tokenCheckInterval = setInterval(checkTokenExpiration, 5000);
    
    return () => {
      clearInterval(tokenCheckInterval);
    };

  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <Header className="App-header"/>
        <p>For this to work, you'll need to grant access to your Spotify</p>
              <p> This access will last for an hour</p>
        {!window.localStorage.getItem('token') ?
          <div >
              
              <a  className='spotifytBtn logInBtn' title='Log into Spotify (logs you out after 1 hour)' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-private playlist-modify`} >
                sign in to Spotify
              </a>
              <p>(to get access token)</p>
          </div>
            :
            <>
                <button className='spotifytBtn logOutBtn' onClick={logout} >
                  sign out of Spotify 
                </button>
            </>

        }
           </header>
        <main>
        <SearchBar setSearch={setSearch} search={search} token={token} setSearchResponse={setSearchResponse} />
        <MakingPlaylist token={token} search={search} searchResponse={searchResponse} />
      </main>
    </div>
  );
}

export default App;
