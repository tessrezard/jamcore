import React, {useState} from 'react';
import styles from './SearchBar.module.css';
import axios from 'axios';

// there is functionality set up here to be able to search for artists or for albums as well. 
// If you uncomment the label and select tags in return, this should work. but app not set up to reveive these as this is a playllist making app. 

function SearchBar ({ token, search, setSearch, setSearchResponse}) {
    const [typeKey, setTypeKey] = useState('tracks');
    const [typeOfSearch, setTypeOfSearch] = useState('track');

//--------------Use if we want to enable type selection
    // function handleTypeSelection() {
    //     SEARCHVALUE = (document.getElementById("typeOfSearch").value);
    //     setTypeOfSearch(SEARCHVALUE);
    //     setTypeKey(`${SEARCHVALUE}s`);
    // }

    function handleChange (e) {
        if (!token && !window.localStorage.getItem('token')){
            alert('You must be logged in to search! thank youuu x')
        } else {
            setSearch(e.target.value);
        }
        setSearch(e.target.value);
    }

    function handleKeyDown (event) {
        if (event.key === 'Enter'){
            setSearch(event.target.value);
        }
    }


    const searchSpotify = async (e) => {

        e.preventDefault();
        const response = await axios.get('https://api.spotify.com/v1/search?' , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: `${search}`,
                type: `${typeOfSearch}`,
                limit: 15,
            }
        });
        const responseItems = [response.data[typeKey].items];
        // console.log(`responseItems ${typeOfSearch}` , responseItems);
        const keysToCopy = ['name', 'artists', 'explicit', 'duration_ms', 'id', 'uri', 'album' ];
        const cleanData = responseItems[0].map(item => {
            const newItem = {}; 
            keysToCopy.forEach((key) => {
                if (key === 'artists'){
                    if (item.hasOwnProperty(key)) {
                        const justArtistsNames = item[key].map(artist => artist['name']);
                        newItem['artists'] = justArtistsNames;
                    }
                } else {
                    if (item.hasOwnProperty(key)) {
                        newItem[key] = item[key];
                    }
                 }
                
            });
            return newItem;
        })
         setSearchResponse(cleanData);

    }


    return(
        <div className={styles.searchBarContainer}>
            <form role='search' onSubmit={searchSpotify} >
                {/* <label htmlFor="typeOfSearch">Type of search</label>
                <select name="typeOfSearch" id="typeOfSearch" onChange={handleTypeSelection}>
                    <option value="track">Track</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                </select> */}
                <input required className={styles.searchBar} type='text' value={search} onChange={handleChange} onKeyDown={handleKeyDown} placeholder='Search'/>
                <input className='syledButton' type='submit' value='Search'/>
            </form>
        </div>
    )
}

export default SearchBar;



