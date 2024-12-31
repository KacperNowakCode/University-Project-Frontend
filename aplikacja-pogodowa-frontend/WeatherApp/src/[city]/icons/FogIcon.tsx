import React, { useState } from "react";
import styles from "./JiggleIcon.module.css";
const FogIcon = () => {
    const [isJiggling, setIsJiggling] = useState(false);

    const handleJiggle = () => {
        setIsJiggling(true);

        
        setTimeout(() => {
            setIsJiggling(false);
        }, 500);
    };

    return (
        <svg onClick={handleJiggle} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1b568d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`${styles.sun} ${isJiggling ? styles.jiggle : ""}`}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 17H7"/><path d="M17 21H9"/></svg>
    );
};

export default FogIcon;