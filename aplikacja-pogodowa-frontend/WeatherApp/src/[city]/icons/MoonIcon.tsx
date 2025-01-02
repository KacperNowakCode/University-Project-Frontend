
import React, { useState } from "react";
import styles from "./JiggleIcon.module.css";

const MoonIcon = () => {
    const [isJiggling, setIsJiggling] = useState(false);

    const handleJiggle = () => {
        setIsJiggling(true);

        
        setTimeout(() => {
            setIsJiggling(false);
        }, 500);
    };

    return (
        <svg onClick={handleJiggle} className={`${styles.sun} ${isJiggling ? styles.jiggle : ""}`} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#85a9cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
    );
};

export default MoonIcon;
