import React from 'react';
import styles from './Playlist.module.css';
import Track from '../trackThings/Track';
import { generateId } from '../../utilities';


function Playlist ({ tracklist, removeTrackfromPlaylist }) {

  const handleRemoveTrack = (trackID) => {
    // Call the addTrackToPlaylist function to add the track to the playlist
    removeTrackfromPlaylist(trackID);
  };


    return(
        <div >
            <h1>Playlist</h1>
            <ol>
            {tracklist.map((song) => {
                    return (
                             <li key={generateId()}>
                                    <Track title={song.title} artist={song.artist} key={song.id}/>
                                    <button onClick={() => handleRemoveTrack(song)}>Remove song</button>
                            </li >
                                    
                            );
                            })
                    }
            </ol>
        </div>
    )
};

export default Playlist;