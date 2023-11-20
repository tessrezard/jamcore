import React, { useState } from "react";
import styles from './Demo.module.css'

function Demo() {


    return (
        <>
            <div className={styles.videoContainer} >
            <iframe 
                
                src="https://www.youtube.com/embed/NjLoCkVbMQU?si=IVVUCgpEUt-wqTPK" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                className={styles.video}>
            </iframe>
            </div>
        </>
    );

}

export default Demo;