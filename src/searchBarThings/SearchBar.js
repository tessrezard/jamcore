import React from 'react';
import styles from './SearchBar.module.css';
import axios from 'axios';


function SearchBar ({ token, search, setSearch, setSearchResponse}) {

    console.log(search);
    
    const searchSpotify = async (e) => {
        e.preventDefault();

        const {data} = await axios.get('https://api.spotify.com/v1/search?' , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: `${search}`,
                type: 'track',
            }
        } )
        ;

        console.log('data', data)
        console.log('data.tracks.items[9].artists', data.tracks.items[9].artists);

        }
    return(
        <div className={styles.searchBarContainer}>
            <form role='search' onSubmit={searchSpotify}>
                <input className={styles.searchBar} type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
                <input className={styles.submitButton} type='submit' value='Search'/>
            </form>
        </div>
    )
}

export default SearchBar;