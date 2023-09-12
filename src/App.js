import logo from './logo.svg';
import './App.css';
import Header from './headerThings/Header';
import SearchBar from './searchBarThings/SearchBar';
import MakingPlaylist from './makingPlaylistThings/MakingPlaylist';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <SearchBar />
        <MakingPlaylist className='makingPlaylist'/>
      </main>
    </div>
  );
}

export default App;
