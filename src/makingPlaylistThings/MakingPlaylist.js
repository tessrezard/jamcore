import React, {useState} from 'react';
import SearchResults from './searchResultsThings/SearchResults';
import Playlist from './playlistThings/Playlist';
import { generateId } from '../utilities';

function MakingPlaylist () {
    const [tracklist, setTracklist] = useState([]);

    const addTrackToPlaylist = (track) => {
        // Update the tracklist state when a track is added
        const newTrack = { ...track, uniqueId: generateId() };
        setTracklist([...tracklist, newTrack]);
      };

    const removeTrackfromPlaylist = (track) => {
      setTracklist(tracklist.filter(trackToRemove =>
        track.uniqueId !== trackToRemove.uniqueId
      ))
    }


    return(
        <div className='makingPlaylist'>
          <SearchResults addTrackToPlaylist={addTrackToPlaylist} />
          <Playlist tracklist={tracklist} removeTrackfromPlaylist={removeTrackfromPlaylist} />
        </div>
    )
};

export default MakingPlaylist;