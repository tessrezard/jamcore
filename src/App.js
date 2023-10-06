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
  const REDIRECT_URI = 'https://jamcore.netlify.app';
  // const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  // let timeRemaining = 0;
  let expirationTime = 0;
  // console.log('expirationTime', expirationTime);
  const hash = window.location.hash;
  // console.log('hash', window.location.hash);

  const logout = () => {
    console.log('enter logout');
    window.location.hash = '';
    window.localStorage.removeItem('token');
    console.log('window.localStorage.getItem(token)', window.localStorage.getItem('token'))
    setToken('');
    // timeRemaining = 0;
    window.localStorage.removeItem('expirationTime');
    // clearInterval(tokenCheckInterval);
  }


// -- SET TOKEN FROM HASH -- if there is a hash, but the token is not yet set. 
  if (!token && hash ) {
    console.log('no token, yes hash')
    const hashToken = hash.substring(1).split('&').find(element => element.startsWith('access_token')).split('=')[1];
    setToken(hashToken);
    window.location.hash = '';
    window.localStorage.setItem('token', hashToken);
    // setToken(token);
 } 

// -- SET LOCAL STORAGE TOKEN FROM STATE VARIABLE -- (if not yet set, if local deleted)
  if (token && !window.localStorage.getItem('token')){
    window.localStorage.setItem('token', token);
  }

// -- SET TOKEN FROM LOCAL STORAGE -- if the page has been reloaded, but the token has not timed out (is still in local storage)
  if (!token){
    console.log('there is no token in state variable');
    if (window.localStorage.getItem('token')){
      setToken(window.localStorage.getItem('token'));
    }
  }

// -- SET EXPIRATION TIME WHEN WE HAVE TOKEN -- if there is not already an expiration time, and we have a token. 
  if (token && !window.localStorage.getItem('expirationTime')){
    const getExpirationTime = Date.now() + 3600 * 1000;
    window.localStorage.setItem('expirationTime', getExpirationTime);
    expirationTime = window.localStorage.getItem('expirationTime');
    console.log('NEW expirationTime', expirationTime)
  }

// -- SET EXPIRATION TIME FROM LOCAL STORAGE -- (if reload, state lost)
  if (!expirationTime && window.localStorage.getItem('expirationTime')){
    expirationTime = window.localStorage.getItem('expirationTime');
  }

  if (expirationTime === 0){
    console.log('expirationTime is 0 :', expirationTime)
  } else if (expirationTime > 0){
    console.log('we have an expiration time: it is ', expirationTime);
  }
 

  // if (timeRemaining < 0){
  //   timeRemaining = 0;
  //   console.log('time remaining made 0: ', timeRemaining);
  // }

  // if(timeRemaining){
  //   console.log('timeRemaining', timeRemaining)
  // } else {
  //   console.log('no time remaining variable');
  // }

  
  //  if (token && window.localStorage.getItem('expirationTime')) {
  //   expirationTime = window.localStorage.getItem('expirationTime');
  // }
  



   useEffect(()=> {

    const checkTokenExpiration = () => {
        const currentTime = Date.now();
        let timeRemaining = 0;
        let timeRemainingInMins = 0;
        if (expirationTime - currentTime){
           timeRemaining = expirationTime - currentTime;
        }
        if (timeRemaining > 0){
           timeRemainingInMins = timeRemaining / 60000;
        } 
        if(timeRemaining < 0) {
           timeRemainingInMins = 0;
        }
        // const timeRemainingInMins = timeRemaining / 60000;
        console.log('timeRemainingInMins', timeRemainingInMins);
        if (timeRemaining < 0 || !window.localStorage.getItem('token')){
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
        <Header className="App-header"/>
        <p>For this to work, you'll need to grant access to your Spotify</p>
              <p> This access will last for an hour</p>
        {!token ?
          <div >
              
              <a  className='spotifytBtn logInBtn' title='Log into Spotify (logs you out after 1 hour)' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-private playlist-modify`} >
                sign in to Spotify
              </a>
              <p>(to get access token)</p>
          </div>
            :
            <>
                <button className='spotifytBtn logOutBtn' onClick={logout} onChange={e=> e.preventDefault()} >
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
