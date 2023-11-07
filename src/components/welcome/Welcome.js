import React, { useState } from "react";
import styles from './Welcome.module.css';
import Demo from '../demo/Demo'
function Welcome() {

    const [moreInfo, setMoreInfo] = useState(false);

    return (
        <>
            <div className={styles.welcome}>
                <p className={styles.welcomeH1}>Hello!</p>
                <p className={styles.welcomeH1}>Welcome to Jamcore</p><br />
                <ul className={styles.welcomeH2}>This project uses the Spotify web API to :
                    <li> • search for songs </li>
                    <li> • create a playlist </li>
                    <li> • add it to your Spotify account. </li>
                </ul>

                <div className={styles.howToUseContainer}onClick={() => setMoreInfo((prev) => !prev)}>
                    <div className={styles.howToUseButton} >
                        Jamcore is in development mode.
                        <br />
                        How to use :
                    </div>
                    {moreInfo ? (<>
                        <div>
                            <p className={styles.howToContent}>
                                Currently, some of Jamecore's functionalities are not accessible to the general public. <br/>
                                To use this application and access its features,
                                you need to get in touch with me directly at tessrezard@gmail.com.
                                <br />
                                I can then add you as an authorized user on the Spotify Developer Dashboard,
                                allowing you to use the application.
                            </p>
                            <p className={styles.howToContent}>
                                Here is a demo video of the site:  <br/><br/>
                                <Demo/>

                                Find out more on the
                                <a href="https://github.com/tessrezard/jamcore#readme" target='_blank' className={styles.links}>
                                    README
                                </a>
                                for Jamcore on my github.
                                <br />
                                <br />
                                <a href="https://github.com/tessrezard" target='_blank' className={styles.links}>
                                    https://github.com/tessrezard 
                                </a>
                            </p>
                            <p className={styles.howToContent}>
                                If we have you set up already, click log in button above. 
                                <br/>
                                The log-in will last an hour, and then you will be logged out automatically. 
                                <br/>
                                To log out manually, just click log out.
                            </p>
                        </div>
                    </>) : (<></>)}

                </div>
            </div>
        </>
    );

}

export default Welcome;