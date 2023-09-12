import React, {useState} from 'react';
import styles from './SearchResults.module.css';
import Track from '../trackThings/Track';
import { generateId } from '../../utilities';


function SearchResults ({ addTrackToPlaylist }) {

    const [searchedSongs, setSearchedSongs] = useState([
        {title : 'Song1', artist: 'artist1', id: '1234b'}, 
        {title : 'Song2', artist: 'artist2', id: '1234a'}, 
        {title : 'Song3', artist: 'artist3', id: '1234c'}, 
        {title : 'Song4', artist: 'artist4', id: '1234d'}, 
        {title : 'Song5', artist: 'artist5', id: '1234e'}, 
        {title : 'Song5', artist: 'artist5', id: '1234f'}, 
    ]);


  // Function to add a track to the playlist
  const handleAddTrack = (song) => {
    // Call the addTrackToPlaylist function to add the track to the playlist
    addTrackToPlaylist(song);
  };

    return(
        <div>
            <h1>Search Results</h1>
            <ul>
                <div>
                    {searchedSongs.map((song) => {
                                return (
                                    <li key={generateId()}>
                                        <Track title={song.title} artist={song.artist} key={song.id}/>
                                        {/* <AddTrackBtn key={generateId} id={song.id} addTrackToPlaylist={addTrackToPlaylist} /> */}
                                        <button className='trackBtn addBtn' onClick={() => handleAddTrack(song)}> + </button>
                                    </li >
                                    
                                );
                            })
                    }
                </div>
            </ul>
        </div>
    )
}




export default SearchResults;




