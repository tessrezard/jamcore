import React, {useState} from 'react';
import styles from './Playlist.module.css';
import Track from '../trackThings/Track';
import { generateId } from '../../utilities';
import axios from 'axios';



function Playlist ({ tracklist, removeTrackfromPlaylist, token }) {

    const [playlistName, setPlaylistName] = useState('');

    const URIs = [];
     for (let i = 0; i < tracklist.length; i++){
        URIs.push(tracklist[i].uri);
     }


    const handleRemoveTrack = (trackID) => {
    // Call the addTrackToPlaylist function to add the track to the playlist
    removeTrackfromPlaylist(trackID);
  };


  const addPlaylist = async (e) => {
    e.preventDefault();

    console.log('token', token);

    const getUser = await axios.get('https://api.spotify.com/v1/me ' , {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(getUser.data.id);

    const createPlaylist = await axios.post(`https://api.spotify.com/v1/users/${getUser.data.id}/playlists` , {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            "name": "NEW API PLAYLIST",
            "description": "New API playlist description",
            "public": false,
        }
    });
    console.log('createPlaylist', createPlaylist);
    }



    return(
        <div className={styles.playlistContainer}>
            <h1>Playlist</h1>
            <input type='text'  placeholder='Name your playlist'  value={playlistName} onChange={ (e)=> setPlaylistName(e.target.value) } ></input>
            <ol className={styles.tracklist}>
            {tracklist.map((track) => {
                    return (
                        <li key={generateId()}>
                            <Track name={track.name} artists={track.artists} key={track.id} explicit={track.explicit} duration_ms={track.duration_ms}/>
                            <button className='trackBtn' onClick={ () => handleRemoveTrack(track) }> - </button>
                            </li >
                            );
                            })
                    }
            </ol>
            <button onClick={addPlaylist} >Add to Spotify</button>

        </div>
    )
};

export default Playlist;