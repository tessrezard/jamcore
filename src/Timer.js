import React, {useEffect} from 'react';
import styles from './Timer.module.css';

function Timer () {

    const expirationTime = window.localStorage.getItem('expirationTime');
    let timeRemaining;
    useEffect(()=>{
        
        const checkTimeRemaining = () => {
            timeRemaining = expirationTime - Date.now();
            // console.log(timeRemaining);
            return (timeRemaining);

        }
        // const timerInterval = setInterval(checkTimeRemaining, 1000);

        return () => {
            // clearInterval(timerInterval);
        }
    }, [])


    return (
        <div>
             <p>{timeRemaining}</p>
        </div>
    )
};

export default Timer;