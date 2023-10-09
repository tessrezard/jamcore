import React, { useEffect, useRef }from 'react';
// import style from './SearchResults.module.css';
import styles from '../MakingPlaylist.module.css';

import Track from '../trackThings/Track';
import { generateId } from '../../utilities';

function SearchResults ({ addTrackToPlaylist, searchResponse }) {

    const resultsRef = useRef(null);


    // Function to add a track to the playlist
    const handleAddTrack = (song) => {
        // Call the addTrackToPlaylist function to add the track to the playlist
        addTrackToPlaylist(song);
    };

    useEffect(() => {
        // Scroll to the search results element when results are updated
        if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [searchResponse]);

    return(
        <div  className={styles.section} ref={resultsRef} >
            <h1>Search Results</h1>
            <ul >
                <div className={styles.tracklist}>
                    {searchResponse.map((track) => {
                        return (
                            <li key={generateId()} className={styles.trackAndItsButtonContainer}>
                                <Track name={track.name} artists={track.artists} explicit={track.explicit} duration_ms={track.duration_ms} image={track.album.images[1].url}/>
                                <button className={styles.trackBtn} onClick={() => handleAddTrack(track)}>
                                    <div className={styles.btn}>+</div> 
                                </button>
                            </li >
                                );
                            })
                    }
                </div>
            </ul>
        </div>
    )
}




export default SearchResults;




