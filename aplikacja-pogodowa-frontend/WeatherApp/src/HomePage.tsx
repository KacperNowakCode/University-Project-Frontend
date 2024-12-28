import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles.module.css";
import JiggleIcon from './jiggleIcon.tsx';
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
            <h1 className={styles.title}>
                OOP Weather
            </h1>
            <JiggleIcon />
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
            <footer className={styles.footer}>
                <a 
                    href="https://github.com/KacperNowakCode" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', paddingRight: '5px' }}
                >
                    Kacper Nowak
                </a> & 
                <a 
                    href="https://github.com/w0dur" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', paddingLeft: '5px' }}
                >
                    Mateusz Wątor
                </a>
            </footer>
        </div>
    );
};


export default HomePage;
