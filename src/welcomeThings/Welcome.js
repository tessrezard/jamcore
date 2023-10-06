import React from "react";
import styles from './Welcome.module.css'

function Welcome() {

return (
    <div className={styles.welcome}>
        <h1 className={styles.welcomeH1}>Hello!</h1>
        <h1 className={styles.welcomeH1}>Welcome to Jamcore</h1>
        <h3>Here at Jamecore, you will be able to search for songs, 
            create a playlist and add it to your Spotify account.</h3>
        <h3> For this to work, you have to log yourself into spotify (click button above). </h3>
        {/* <h3>
            You will be asked to grant youself permission to search and add a playlist. 
            When that is done, we can go ahead and start! </h3> */}
        <h3>The 'log in' will last an hour, 
            and then you will be logged out automatically. 
            If you what to log out before the hour is up, you can click log out.</h3>
        <h2></h2>
    </div>
);

}

export default Welcome;