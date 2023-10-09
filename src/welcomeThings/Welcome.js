import React from "react";
import styles from './Welcome.module.css'

function Welcome() {

return (
    <div className={styles.welcome}>
        <h1 className={styles.welcomeH1}>Hello!</h1>
        <h1 className={styles.welcomeH1}>Welcome to Jamcore</h1><br/>
        <h3  className={styles.welcomeH3}>Here you will be able to : <br/>
            • search for songs <br/>
            • create a playlist <br/>
            • add it to your Spotify account.</h3>
            <br/>
        <h3 className={styles.welcomeH3}> For this to work, you have to log yourself into spotify (click button above). <br/>
        {/* <h3>
            You will be asked to grant youself permission to search and add a playlist. 
            When that is done, we can go ahead and start! </h3> */}
        The 'log in' will last an hour, 
            and then you will be logged out automatically. <br/>
            If you what to log out before the hour is up, you can click log out.</h3>
        
    </div>
);

}

export default Welcome;