import React from "react";
import styles from './Welcome.module.css'

function Welcome() {

    return (
        <div className={styles.welcome}>
            <p className={styles.welcomeH1}>Hello!</p>
            <p className={styles.welcomeH1}>Welcome to Jamcore</p><br />
            <ul className={styles.welcomeH2}>This project utilizes the Spotify web API to :
                <li> • search for songs </li>
                <li> • create a playlist </li>
                <li> • add it to your Spotify account. </li>
            </ul>

            <p className={styles.welcomeH3}>
                Jamcore is currently in development mode.
                <br />
                This means it is not accessible to the general public.
                To use this application and access its features,
                you need to get in touch with the developer (that’s me!) directly.
                <br />
                tessrezard@gmail.com
                <br />

                Once you express your interest,
                I will add you as an authorized user on the Spotify Developer Dashboard,
                allowing you to use the application.
            </p>
            <br />

            <p className={styles.welcomeH3}>
                If if you would rather watch a  <br />
                <a href="https://github.com/tessrezard/jamcore#readme" target='_blank'> <u>video demo</u> </a> <br />
                you can find one on the
                <a href="https://github.com/tessrezard/jamcore#readme" target='_blank'> <u>README</u> </a>
                for Jamcore on my github.
                <br />
                <br />
                <a href="https://github.com/tessrezard" target='_blank'> <u>https://github.com/tessrezard</u> </a>
            </p>

            <br />

            <br />
            <p className={styles.welcomeH4}>
                If we have you set up already, you can to log yourself in (click log in button above). <br />
                The 'log in' will last an hour,
                and then you will be logged out automatically. <br />
                If you what to log out before the hour is up, you can click log out.
            </p>

        </div>
    );

}

export default Welcome;