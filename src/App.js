import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './headerThings/Header';
import SearchBar from './searchBarThings/SearchBar';
import MakingPlaylist from './makingPlaylistThings/MakingPlaylist';


function App() {

  const [search, setSearch] = useState('');

  const CLIENT_ID = '1dd99b44b5114c6ea2a3f4792ebb4c11'; 
  const CLIENT_SECRET = 'cab3b304acf64b249a46dc36f9f8fec8'; 
  const REDIRECT_URI = 'http://localhost:3000';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const logout = () => {
    window.localStorage.removeItem('token', token);
    setTokenExpiresAt('');
    setToken('');
  }
  const [token, setToken] = useState('');
  const [tokenExpiresAt, setTokenExpiresAt] = useState('');

  useEffect(()=> {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');
    const expirationTime = Date.now() + 3600 * 1000;


    if (!token && hash) {
      token = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1];
      console.log(token);
      window.location.hash = '';
      window.localStorage.setItem('token', token);
      setToken(token);
      setTokenExpiresAt(expirationTime);
    }

    const checkTokenExpiration = () => {
      const currentTime = Date.now();
      console.log('inside interval!')

      if (tokenExpiresAt && currentTime >= expirationTime || !window.localStorage.getItem('token', token)){
        logout();
        console.log('we have gone intot he checktojenexpiration if')
      }
    }

    // Check token expiration every minute (adjust this interval as needed)
    const tokenCheckInterval = setInterval(checkTokenExpiration, 10000);

    return () => {
      clearInterval(tokenCheckInterval);
    };

  }, [])

  console.log(window.localStorage);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        {!token ? 
            <a title='Log into Spotify (logs you out after 1 hour)' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} >Login to Spotify</a>
            :
            <button onClick={logout} >logout</button>
        }
           </header>
        <main>
        <SearchBar setSearch={setSearch} search={search} />
        <MakingPlaylist className='makingPlaylist' search={search} />
      </main>
    </div>
  );
}

export default App;
