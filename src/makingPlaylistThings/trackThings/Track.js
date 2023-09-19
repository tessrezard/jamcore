import React from 'react';
import styles from './Track.module.css'

function Track({ name, artists, key, id, explicit, duration_ms, image }) {

  const duration_s = ((duration_ms / 1000) / 60).toFixed(2);

  //React is getting VERY upset about e wanting to know the length of artists. 
  // console.log('artists.length', key.length);
  // let artistsSting;
  // if (key.length > 1){
  //   artistsSting = key.toString;
  //   console.log('artistsSting', artistsSting);
  // }


  return (

    <div className={styles.trackContainer}>
      <div className={styles.trackInfo}>
        <img src={image} alt='album image' width="120" height="120" />
      </div>
      <div className={styles.trackInfo}>
        <h3>
          {name}
        </h3>
        <h4>
          {artists}
        </h4>
        <h5>
          {duration_s}
        </h5>
        <p>
          {explicit ? 'explicit' : ''}
        </p>
      </div >

    </div>

  );
}

export default Track;