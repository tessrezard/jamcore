import React from 'react';
import styles from './Track.module.css'

function Track (prop){
    return(
      <div className={styles.trackContainer}>
          <h3>
            {prop.title} 
          </h3>
          <h4>
            {prop.artist}
          </h4>
      </div>
    );
  }

  export default Track;