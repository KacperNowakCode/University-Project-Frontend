import React, { useState } from "react";
import styles from "./JiggleIcon.module.css";

const SnowIcon = () => {
    const [isJiggling, setIsJiggling] = useState(false);

    const handleJiggle = () => {
        setIsJiggling(true);

        
        setTimeout(() => {
            setIsJiggling(false);
        }, 500);
    };

    return (
        <svg onClick={handleJiggle} xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#85a9cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`${styles.sun} ${isJiggling ? styles.jiggle : ""}`}><path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/></svg>
    );
};

export default SnowIcon;