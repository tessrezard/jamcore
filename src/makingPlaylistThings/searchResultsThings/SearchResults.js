import React from 'react';
import styles from './SearchResults.module.css';
import Track from '../trackThings/Track';
import AddTrackBtn from '../addTrackBtnThings/AddTrackBtn';
import { generateId } from '../../utilities';

const placeHolderArr = [
    {title : 'Song2', artist: 'artist2', id: '1234a'}, 
    {title : 'Song1', artist: 'artist1', id: '1234b'}, 
    {title : 'Song3', artist: 'artist3', id: '1234c'}, 
    {title : 'Song4', artist: 'artist4', id: '1234d'}, 
    {title : 'Song5', artist: 'artist5', id: '1234e'}, 
    {title : 'Song5', artist: 'artist5', id: '1234f'}, 
];


function SearchResults () {
    return(
        <div>
            <h1>Search Results</h1>
            <ul>
                <div>
                    {placeHolderArr.map(song => {
                                return (
                                    <>
                                        <Track title={song.title} artist={song.artist} key={song.id}/>
                                        <AddTrackBtn key={generateId} id={song.id} />
                                    </>
                                    
                                );
                            })
                    }
                </div>
            </ul>
        </div>
    )
}




export default SearchResults;




