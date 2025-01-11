import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles.module.css";
import JiggleIcon from './jiggleIcon.tsx';
import citiesData from './cities5000.json';

const HomePage = () => {
    const [location, setLocation] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setLocation(value);

        if (value.trim()) {
            const filtered = citiesData
                .filter(city => city.toLowerCase().startsWith(value.toLowerCase()))
                .slice(0, 5); 
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    };

    const handleSearch = () => {
        if (location.trim()) {
            navigate(`/${location}`);
        }
    };

    return (
        <div className={styles.container}>
            <JiggleIcon/>
            <h1 className={styles.title}>
                OOP Weather
            </h1>
            
            
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={location}
                    onChange={handleInputChange}
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

            
            {filteredCities.length > 0 && (
                <ul className={styles.ulist}>
                    {filteredCities.map((city, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                setLocation(city);
                                setFilteredCities([]);
                                navigate(`/${city}`);
                            }}
                            className={styles.suggestion}
                        >
                            <em>{city}</em>
                        </p>
                    ))}
                </ul>
            )}

            <footer className={styles.footer}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <a 
                    href="https://github.com/KacperNowakCode" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ marginLeft: '5px', textDecoration: 'none', color: 'inherit', paddingRight: '5px' }}
                >
                    <b>Kacper Nowak</b>
                </a> <b>& </b>
                <a 
                    href="https://github.com/MateuszWator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', paddingLeft: '5px' }}
                >
                    <b>Mateusz Wątor</b>
                </a>
            </footer>
        </div>
    );
};

export default HomePage;
