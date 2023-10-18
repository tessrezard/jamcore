import React, { useState, useEffect } from 'react';
import playlistStyle from './Playlist.module.css';
import styles from '../MakingPlaylist.module.css';

import Track from '../trackThings/Track';
import { generateId } from '../../utilities';
import axios from 'axios';



function Playlist({ tracklist, setTracklist, removeTrackfromPlaylist, token, }) {

    const [playlistName, setPlaylistName] = useState('Your Jamcore Playlist');
    const URIs = [];

    useEffect(()=>{
        window.localStorage.setItem('tracklist', tracklist);
      }, [tracklist])

    for (let i = 0; i < tracklist.length; i++) {
        URIs.push(tracklist[i].uri);
    }

    const handleRemoveTrack = (trackID) => {
        removeTrackfromPlaylist(trackID);
    };

    const checkPlaylistName = () => {
        if (playlistName.length <= 0){
            setPlaylistName('Your Jamcore Playlist');
        }
    };

    checkPlaylistName();

    const addPlaylist = async (e) => {
        e.preventDefault();
        const getUser = await axios.get('https://api.spotify.com/v1/me ', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log('getUser.data', getUser.data);
        // console.log('getUser.data.id', getUser.data.id);
        // console.log('uris', URIs);
        let createPlaylist = {};
        try {
            createPlaylist = await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/users/${getUser.data.id}/playlists`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    "name": `${playlistName}`,
                    "description": "Made on jamcore.netlify.app with the spotify API",
                    "public": false,
                }
            });
        } catch (e) {
            console.log('createPlaylist error', e);
        }
        // console.log('createPlaylist', createPlaylist);
        const playlist_id = createPlaylist.data.id;
        try {
            const addItemsToPlaylist = await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    "uris": URIs,
                    "position": 0,
                }
            });
            // console.log('addItemsToPlaylist', addItemsToPlaylist);
        } catch (e) {
            console.log('addItemsToPlaylist error', e);
        }
        setTracklist([]);
        setPlaylistName('Your Jamcore Playlist');
        document.getElementById('inputNamingPlaylist').value = '';
    }


    return (
        <div  className={styles.section} >
            <h1>Playlist</h1>
            <input className={playlistStyle.input}  id='inputNamingPlaylist' type='text' placeholder='Name your playlist' onChange={(e) => setPlaylistName(e.target.value)} ></input>
            <ol className={styles.tracklist}>
                {tracklist.map((track) => {
                    return (
                        <li key={generateId()} className={styles.trackAndItsButtonContainer}>
                            <Track name={track.name} artists={track.artists} explicit={track.explicit} duration_ms={track.duration_ms}  image={track.album.images[1].url} />
                            <button className={styles.trackBtn} onClick={() => handleRemoveTrack(track)}> 
                                <div className={styles.btn}>-</div> 
                            </button>

                        </li >
                    );
                })
                }
            </ol>
            <button className='syledButton addtoSpotBtn'  onClick={addPlaylist} >Add to Spotify</button>
        </div>
    )
};

export default Playlist;