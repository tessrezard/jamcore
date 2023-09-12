import React from 'react';
import styles from './SearchBar.module.css'

function SearchBar () {
    return(
        <div className={styles.searchBarContainer}>
            <form role='search'>
                <input className={styles.searchBar} type='text'/>
                <input className={styles.submitButton} type='submit' value='Search'/>
            </form>
        </div>
    )
}

export default SearchBar;