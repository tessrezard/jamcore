import React, {useState} from 'react';
import SearchResults from './searchResultsThings/SearchResults';
import Playlist from './playlistThings/Playlist';
import { generateId } from '../utilities';

function MakingPlaylist ({search, searchResponse}) {
  const [tracklist, setTracklist] = useState([]);

  console.log('searchResponse', searchResponse);

    const addTrackToPlaylist = (track) => {
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
          <SearchResults addTrackToPlaylist={addTrackToPlaylist} searchResponse={searchResponse} />
          <Playlist tracklist={tracklist} removeTrackfromPlaylist={removeTrackfromPlaylist} />
        </div>
    )
};

export default MakingPlaylist;