import { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles.module.css";

const HomePage = () => {
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (location.trim()) {
            navigate(`/${location}`);
        }
    };
    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Weather App</h1>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className={styles.input}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button
                    onClick={handleSearch}
                    className={styles.button}
                >
                    Search
                </button>
            </div>
            <footer className={styles.footer}>Kacper Nowak & Mateusz Wątor</footer>
        </div>
    );
};


export default HomePage;
