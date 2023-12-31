import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <>
            <div className={styles.appFooter}>
                <div className={styles.spotify}>
                    <p>All metadata supplied and made available by Spotify.</p>

                </div>
                <img src={require('../../Spotify_Logo_RGB_Green.png')} className={styles.spotifyLogo} alt='spotify logo' />

                <p>Click on a track to open it in spotify.</p>
            </div>
        </>

    )
};

export default Footer;