
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (location.trim()) {
            navigate(`/${location}`);
        }
    };

    return (
        <div style={{}}>
            <h1>Weather App</h1>
            <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            style={{ padding: '10px', width: '300px', fontSize: '16px' }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
        />
            <button
                onClick={handleSearch}
                style={{
                    padding: '10px 20px',
                    marginLeft: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
            >
                Search
            </button>
        </div>
    );
};

export default HomePage;
