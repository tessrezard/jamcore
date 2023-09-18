import React, {useState} from 'react';
import styles from './Playlist.module.css';
import Track from '../trackThings/Track';
import { generateId } from '../../utilities';


function Playlist ({ tracklist, removeTrackfromPlaylist }) {

    const [playlistName, setPlaylistName] = useState('');

    const URIs = [];
     for (let i = 0; i < tracklist.length; i++){
        URIs.push(tracklist[i].uri);
     }


    const handleRemoveTrack = (trackID) => {
    // Call the addTrackToPlaylist function to add the track to the playlist
    removeTrackfromPlaylist(trackID);
  };


    return(
        <div className={styles.playlistContainer}>
            <h1>Playlist</h1>
            <input type='text'  placeholder='Name your playlist'  value={playlistName} onChange={ (e)=> setPlaylistName(e.target.value) } ></input>
            <ol className={styles.tracklist}>
            {tracklist.map((song) => {
                    return (
                        <li key={generateId()}>
                            <Track name={song.name} artist={song.artist} key={song.id} album={song.album} />
                            <button className='trackBtn' onClick={ () => handleRemoveTrack(song) }> - </button>
                            </li >
                            );
                            })
                    }
            </ol>
            <button>Add to Spotify</button>

        </div>
    )
};

export default Playlist;