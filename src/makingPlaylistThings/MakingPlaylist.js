import React, { useState} from 'react';
import SearchResults from './searchResultsThings/SearchResults';
import Playlist from './playlistThings/Playlist';
import { generateId } from '../utilities';
import styles from './MakingPlaylist.module.css';

function MakingPlaylist ({ searchResponse, token}) {
  const [tracklist, setTracklist] = useState([]);


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
        <div className={styles.makingPlaylistContainer} >
          <SearchResults className={styles.section} addTrackToPlaylist={addTrackToPlaylist} searchResponse={searchResponse} />
          <Playlist className={styles.section} token={token} tracklist={tracklist} setTracklist={setTracklist} removeTrackfromPlaylist={removeTrackfromPlaylist} searchResponse={searchResponse}/>
        </div>
    )
};

export default MakingPlaylist;