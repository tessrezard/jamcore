import React from 'react';
import styles from './SearchBar.module.css'

function SearchBar ({search, setSearch}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        }
    return(
        <div className={styles.searchBarContainer}>
            <form role='search' onSubmit={handleSubmit}>
                <input className={styles.searchBar} type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
                <input className={styles.submitButton} type='submit' value='Search'/>
            </form>
        </div>
    )
}

export default SearchBar;