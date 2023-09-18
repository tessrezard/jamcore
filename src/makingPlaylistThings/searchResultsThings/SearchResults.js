import React, {useState} from 'react';
import styles from './SearchResults.module.css';
import Track from '../trackThings/Track';
import { generateId } from '../../utilities';

function SearchResults ({ addTrackToPlaylist, searchResponse }) {

    // const [searchedSongs, setSearchedSongs] = useState([
    //     {name: 'Song2', artist: 'artist2', album: 'album 1', id: '1234a', uri: '12334'}, 
    //     {name: 'Song1', artist: 'artist1', album: 'album 1', id: '1234b', uri: '12335'}, 
    //     {name: 'Song3', artist: 'artist3', album: 'album 1', id: '1234c', uri: '12336'}, 
    // ]);


  // Function to add a track to the playlist
  const handleAddTrack = (song) => {
    // Call the addTrackToPlaylist function to add the track to the playlist
    addTrackToPlaylist(song);
  };

    return(
        <div className={styles.searchResultsContainer}>
            <h1>Search Results</h1>
            <ul>
                <div>
                    {searchResponse.map((track) => {
                        return (
                            <li key={generateId()}>
                                <Track name={track.name} artists={track.artists} key={track.id} explicit={track.explicit} duration_ms={track.duration_ms}/>
                                <button className='trackBtn' onClick={() => handleAddTrack(track)}> + </button>
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




