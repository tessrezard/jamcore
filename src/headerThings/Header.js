import React from 'react';
import styles from './Header.module.css';
import jam from '../jam copy.png'
function Header () {
    return(
        <>
            <div className={styles.logo}>
                Jamcore
            </div>
            <div className={styles.appTitle}>
                <h1>What's your jam?</h1>
            </div>
        </>

    )
};

export default Header;