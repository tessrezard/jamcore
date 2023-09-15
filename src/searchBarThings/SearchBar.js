import React, {useState} from 'react';
import styles from './SearchBar.module.css';
import axios from 'axios';

// there is functionality set up here to be able to search for artists or for albums as well. 
// If you uncomment the label and select tags in return, this should work. but app not set up to reveive these as this is a playllist making app. 

function SearchBar ({ token, search, setSearch, setSearchResponse}) {
    const [typeKey, setTypeKey] = useState('tracks');
    const [typeOfSearch, setTypeOfSearch] = useState('track');
    let SEARCHVALUE;

    function handleTypeSelection() {
        SEARCHVALUE = (document.getElementById("typeOfSearch").value);
        setTypeOfSearch(SEARCHVALUE);
        setTypeKey(`${SEARCHVALUE}s`);
    }


    const searchSpotify = async (e) => {

        // console.log('in search Spotify - search: ', search);
        // console.log('in search Spotify - typeOfSearch: ', typeOfSearch);
        // console.log('in search Spotify - typeKey: ', typeKey);
        e.preventDefault();

        const response = await axios.get('https://api.spotify.com/v1/search?' , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: `${search}`,
                type: `${typeOfSearch}`,
                limit: 10,
            }
        } )
        ;

        // console.log('resonse', response);
        // console.log('response.data', response.data)
        const responseItems = [response.data[typeKey].items];
        console.log(`responseItems ${typeOfSearch}` , responseItems);

        console.log(response.data[typeKey].items[9].artists[0].name);
        console.log(response.data[typeKey].items[9].artists.length);

        // const searchedTrackData = responseItems.map( (item) => {
        //     for (let i = 0; i < item.artists.length(); i++){
        //         console.log(item.artists[i]);
        //     }
        // });

        // console.log(searchedTrackData);

        }



    return(
        <div className={styles.searchBarContainer}>
            <form role='search' onSubmit={searchSpotify}>
                {/* <label htmlFor="typeOfSearch">Type of search</label>
                <select name="typeOfSearch" id="typeOfSearch" onChange={handleTypeSelection}>
                    <option value="track">Track</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                </select> */}
                <input required className={styles.searchBar} type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
                <input className={styles.submitButton} type='submit' value='Search'/>
            </form>
        </div>
    )
}

export default SearchBar;



