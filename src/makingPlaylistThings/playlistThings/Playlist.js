import React, {useState} from 'react';
import styles from './Playlist.module.css';
import Track from '../trackThings/Track';
import { generateId } from '../../utilities';
import axios from 'axios';



function Playlist ({ tracklist, removeTrackfromPlaylist, token, searchResponse }) {

    const [playlistName, setPlaylistName] = useState('Your Jamcore Playlist');

    const URIs = [];
     for (let i = 0; i < tracklist.length; i++){
        URIs.push(searchResponse[i].uri);
     }

     console.log('uris: ', URIs);

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
    console.log('getUser.data', getUser.data);
    console.log('getUser.data.id', getUser.data.id);
    
    console.log('uris', URIs);

    let createPlaylist = {};



    try {
        createPlaylist = await axios({
            method: 'post', 
            url: `https://api.spotify.com/v1/users/${getUser.data.id}/playlists`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            data: {
                "name": `${playlistName}`,
                "description": "New API playlist description",
                "public": false,
            }
        });

    } catch(e) {
        console.log('createPlaylist error', e);
    }

    console.log('createPlaylist', createPlaylist);
    console.log('createPlaylist.data.id', createPlaylist.data.id);
    const playlist_id = createPlaylist.data.id;
    console.log('playlist_id', playlist_id);



    try {
        const addItemsToPlaylist = await axios({
            method: 'post', 
            url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            data: {
                "uris": URIs,
                "position": 0,
            }
        });
        console.log('addItemsToPlaylist', addItemsToPlaylist);

    } catch(e) {
        console.log('addItemsToPlaylist error', e);
    }

    }


    return(
        <div className={styles.playlistContainer}>
            <h1>Playlist</h1>
            <input type='text'  placeholder='Name your playlist'  onChange={ (e)=> setPlaylistName(e.target.value) } ></input>
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