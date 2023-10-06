import React from "react";
import styles from './Logo.module.css';
import './jamcoreLogo.png';


function Logo() {

return (
    <>

        <img src={require('./jamcoreLogo.png')} className={styles.logo}/>

    </>
);

}

export default Logo;