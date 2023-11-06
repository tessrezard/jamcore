import React from 'react';
import styles from './Track.module.css'

function Track({ name, artists, explicit, duration_ms, image, link }) {

  const duration_s = ((duration_ms / 1000) / 60).toFixed(2);
  const duration = duration_s.split('.').join(':');
  //React is getting VERY upset about e wanting to know the length of artists. 
  // console.log('artists.length', key.length);
  // let artistsSting;
  // if (key.length > 1){
  //   artistsSting = key.toString;
  //   console.log('artistsSting', artistsSting);
  // }

  const openTrackInSpotify = () => {
    window.open(`${link}`,  "_blank" )
  }


  return (

    <div onClick={openTrackInSpotify} className={styles.trackContainer}>
      <div>
        <img src={image} alt={`album cover for ${name}`} className={styles.img}  />
      </div>
      <div className={styles.trackInfo}>
        <p className={styles.name}> {name} </p>
        <p className={styles.artists}> {artists} </p>
        <p className={styles.duration}> {duration} </p>
        <p className={styles.explicit}> {explicit ? 'explicit' : ''} </p>
      </div >

    </div>

  );
}

export default Track;