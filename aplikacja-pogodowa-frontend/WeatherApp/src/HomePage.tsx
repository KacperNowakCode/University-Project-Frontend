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
            <JiggleIcon/>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{marginTop:'1px', marginRight: '8px'}} className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <a 
                    href="https://github.com/KacperNowakCode" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', paddingRight: '5px' }}
                >
                    Kacper Nowak
                </a> & 
                <a 
                    href="https://github.com/MateuszWator" 
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
