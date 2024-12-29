import React, { useState } from "react";
import styles from "./JiggleIcon.module.css";

const ThunderIcon = () => {
    const [isJiggling, setIsJiggling] = useState(false);

    const handleJiggle = () => {
        setIsJiggling(true);

        
        setTimeout(() => {
            setIsJiggling(false);
        }, 500);
    };

    return (
        <svg onClick={handleJiggle} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#04213e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`${styles.sun} ${isJiggling ? styles.jiggle : ""}`}><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"/><path d="m13 12-3 5h4l-3 5"/></svg>
    );
};

export default ThunderIcon;

