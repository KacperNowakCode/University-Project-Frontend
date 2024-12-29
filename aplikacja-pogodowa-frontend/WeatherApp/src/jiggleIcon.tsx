import React, { useState } from "react";
import styles from "./JiggleIcon.module.css"; // Assuming you create a separate CSS file for this component

const JiggleIcon = () => {
    const [isJiggling, setIsJiggling] = useState(false);

    const handleJiggle = () => {
        setIsJiggling(true);

        // Remove the jiggle effect after the animation ends
        setTimeout(() => {
            setIsJiggling(false);
        }, 500); // Match animation duration
    };

    return (
        <svg
            className={`${styles.sun} ${isJiggling ? styles.jiggle : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e6df0a"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={handleJiggle}
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    );
};

export default JiggleIcon;

