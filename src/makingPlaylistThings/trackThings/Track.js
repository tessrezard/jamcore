import React from 'react';
import styles from './Track.module.css'

function Track (prop){
    return(
      <div className={styles.trackContainer}>
          <h3>
            {prop.name} 
          </h3>
          <h4>
            {prop.artist}
          </h4>
          <img src={prop.items}/>
      </div>
    );
  }

  export default Track;