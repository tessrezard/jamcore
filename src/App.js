import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './headerThings/Header';
import SearchBar from './searchBarThings/SearchBar';
import MakingPlaylist from './makingPlaylistThings/MakingPlaylist';
import {CLIENT_ID, CLIENT_SECRET} from './APIs/secret'

function App() {

  const [search, setSearch] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);
  const [token, setToken] = useState('');

  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  let timeRemaining = 0;

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken('');
    timeRemaining = 0;
  }


  useEffect(()=> {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
    const expirationTime = Date.now() + 3600 * 1000;


    const checkTokenExpiration = () => {
      const currentTime = Date.now();
      timeRemaining = expirationTime - currentTime;
      console.log(timeRemaining);
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



    
    console.log('token', token);
    console.log('window.localStorage.getItem', window.localStorage.getItem('token', token))

    // Check token expiration every minute (adjust this interval as needed)
    const tokenCheckInterval = setInterval(checkTokenExpiration, 10000);
    
    return () => {
      clearInterval(tokenCheckInterval);
    };

  }, [])

  console.log('searchResponse in app', searchResponse);

  return (
    <div className="App">
      <header className="App-header">
        <Header className="App-header"/>
        {!token || !window.localStorage.getItem('token', token) ?
          <div className='spotifytBtn'>
              <a   title='Log into Spotify (logs you out after 1 hour)' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} >
                Log into Spotify
              </a>
          </div>
            :
            <button className='spotifytBtn' onClick={logout} >Log out of Spotify </button>
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
