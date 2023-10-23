import React from 'react';
import styles from './Footer.module.css';

function Footer () {
    return(
        <>
            <div className={styles.appFooter}>
                <div className={styles.spotify}>
                    <h4>All metadata supplied and made available by Spotify.</h4>

                </div>
                <img src={require('../Spotify_Logo_RGB_Green.png')} className={styles.spotifyLogo}/>

            <h4>Click on a track to open it in spotify.</h4>
            </div>
        </>

    )
};

export default Footer;