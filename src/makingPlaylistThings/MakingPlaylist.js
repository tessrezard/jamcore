import React from 'react';
import SearchResults from './searchResultsThings/SearchResults';
import Playlist from './playlistThings/playlistThings/Playlist';

function MakingPlaylist () {
    return(
        <div className='makingPlaylist'>
          <SearchResults />
          <Playlist />
        </div>
    )
};

export default MakingPlaylist;