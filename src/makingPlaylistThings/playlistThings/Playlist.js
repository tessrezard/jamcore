import React, { useState } from 'react';
import styles from './Playlist.module.css';
import Track from '../trackThings/Track';
import { generateId } from '../../utilities';
import axios from 'axios';



function Playlist({ tracklist, setTracklist, removeTrackfromPlaylist, token, searchResponse }) {

    const [playlistName, setPlaylistName] = useState('Your Jamcore Playlist');
    const URIs = [];

    for (let i = 0; i < tracklist.length; i++) {
        URIs.push(tracklist[i].uri);
    }

    console.log('tracklist', tracklist);

    const handleRemoveTrack = (trackID) => {
        removeTrackfromPlaylist(trackID);
    };

    const checkPlaylistName = () => {
        console.log('playlistName length', playlistName.length);
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
                    "description": "New API playlist description",
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
        <div className={styles.playlistContainer}>
            <h1>Playlist</h1>
            <input id='inputNamingPlaylist' type='text' placeholder='Name your playlist' onChange={(e) => setPlaylistName(e.target.value)} ></input>
            <ol className={styles.tracklist}>
                {tracklist.map((track) => {
                    return (
                        <li key={generateId()}>
                            <Track name={track.name} artists={track.artists} key={track.id} explicit={track.explicit} duration_ms={track.duration_ms} />
                            <button className='trackBtn' onClick={() => handleRemoveTrack(track)}> - </button>
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