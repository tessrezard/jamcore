import React, {useState} from 'react';
import SearchResults from './searchResultsThings/SearchResults';
import Playlist from './playlistThings/Playlist';

function MakingPlaylist () {
    const [tracklist, setTracklist] = useState([]);

    const addTrackToPlaylist = (track) => {
        // Update the tracklist state when a track is added
        setTracklist([...tracklist, track]);
      };

    const removeTrackfromPlaylist = (track) => {
      // Update the tracklist state when a track is removed
      setTracklist(tracklist.filter(track =>
        track.id !== track.id
      ))
    }

      console.log(tracklist);

    return(
        <div className='makingPlaylist'>
          <SearchResults addTrackToPlaylist={addTrackToPlaylist} />
          <Playlist tracklist={tracklist} removeTrackfromPlaylist={removeTrackfromPlaylist} />
        </div>
    )
};

export default MakingPlaylist;