import React from 'react';
import styles from './Footer.module.css';

function Footer () {
    return(
        <>

            <div className={styles.appTitle}>
                <h2>All metadata supplied and made available by Spotify.</h2>
                <img src={require('../Spotify_Logo_RGB_Green.png')} className='spotifyLogo'/>
                <h2>Ctrl-click on many track to see in spotify.</h2>

            </div>
        </>

    )
};

export default Footer;