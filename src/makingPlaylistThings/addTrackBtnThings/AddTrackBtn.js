import React, {useState} from 'react';
import styles from './AddTrackBtn.module.css';


function AddTrackBtn ({id}) {
    const [trackList, setTrackList] = useState([]);


    const handleAddTrack = (e) => {
        alert(`Track wants to be addeed! the track id is lalalalla : ${id}`);
        let addNewTrack = trackList.map(track => track);
        setTrackList((prev) => [prev, id] );
        console.log(addNewTrack);
    };


    
    return(
        <div>
            <button onClick={handleAddTrack}>Add Track</button>
        </div>
    )
};

export default AddTrackBtn;