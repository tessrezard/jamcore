import React from 'react';
import styles from './Track.module.css'

function Track({ name, artists, explicit, duration_ms, image, link }) {

  const duration_s = ((duration_ms / 1000) / 60).toFixed(2);
  const duration = duration_s.split('.').join(':');

  // if there multiple artists on a track, print them with spaces
  let artistsString = artists.join(', ')
  console.log('names', artistsString)

  const openTrackInSpotify = () => {
    window.open(`${link}`, "_blank")
  }


  return (
    <>
      <div onClick={openTrackInSpotify} className={styles.trackContainer}>
        <div>
          <img src={image} alt={`album cover for ${name}`} className={styles.img} />
        </div>
        <div className={styles.trackInfo}>
          <p className={styles.name}> {name} </p>
          <p className={styles.artists}> {artistsString} </p>
          <p className={styles.duration}> {duration} </p>
          <p className={styles.explicit}> {explicit ? 'explicit' : ''} </p>
        </div >
      </div>
    </>
  );
}

export default Track;