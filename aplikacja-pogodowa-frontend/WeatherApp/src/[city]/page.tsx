import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SunIcon from './icons/SunIcon';
import RainIcon from './icons/RainIcon';
import CloudIcon from './icons/CloudIcon';
import FogIcon from './icons/FogIcon';
import SnowIcon from './icons/SnowIcon';
import ThunderIcon from './icons/ThunderIcon';
import MoonIcon from './icons/MoonIcon';
import styles from "./Pagestyle.module.css";
import citiesData from './cities5000.json';

interface CityData {
  weatherCode_hourly: number[];
  temperature_hourly: number[];
  most_common_weather_code: number;
  daily_min_temperature: number;
  daily_max_temperature: number;
  weekly_max_temperature: number;
  weekly_min_temperature: number;
}

const weatherIcons: Record<number, React.FC> = {
  0: SunIcon,
  1: SunIcon,
  2: CloudIcon,
  3: CloudIcon,
  45: FogIcon,
  48: FogIcon,
  51: RainIcon,
  53: RainIcon,
  55: RainIcon,
  56: RainIcon,
  57: RainIcon,
  61: RainIcon,
  63: RainIcon,
  65: RainIcon,
  66: RainIcon,
  67: RainIcon,
  71: SnowIcon,
  73: SnowIcon,
  75: SnowIcon,
  77: SnowIcon,
  80: RainIcon,
  81: RainIcon,
  82: RainIcon,
  85: SnowIcon,
  86: SnowIcon,
  95: ThunderIcon,
  97: ThunderIcon,
  99: ThunderIcon,
};

export default function SlugPage() {
  const [weatherData, setWeatherData] = useState<CityData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState('');
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!slug) return;

      const data = await getData(slug);
      if (data) {
        setWeatherData(data);
      } else {
        console.error('Error fetching data');
      }
      setLoading(false);
    };

    fetchData();
  }, [slug]);

  const getData = async (city: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/weather/${city}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      return response.json() as Promise<CityData>;
    } catch (error) {
      console.error('Error fetching data', error);
      return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const currentHour = new Date().getHours();

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.h1}>
            {slug?.toUpperCase()}
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
            <button onClick={handleSearch} className={styles.button}>
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
                                setLocation('');
                            }}
                            className={styles.suggestion}
                        >
                            <em>{city}</em>
                        </p>
                    ))}
                </ul>
            )}

          {weatherData && (
            <div>
              <div className={styles.temperatureContainer}>
                <div className={styles.temperatureItem}>
                  <div className={styles.temperatureLabel}>Daily Max Temperature</div>
                  <div className={styles.temperatureValue}>{weatherData.daily_max_temperature}°C</div>
                </div>
                <div className={styles.temperatureItem}>
                  <div className={styles.temperatureLabel}>Daily Min Temperature</div>
                  <div className={styles.temperatureValue}>{weatherData.daily_min_temperature}°C</div>
                </div>
                <div className={styles.temperatureItem}>
                  <div className={styles.temperatureLabel}>Weekly Max Temperature</div>
                  <div className={styles.temperatureValue}>{weatherData.weekly_max_temperature}°C</div>
                </div>
                <div className={styles.temperatureItem}>
                  <div className={styles.temperatureLabel}>Weekly Min Temperature</div>
                  <div className={styles.temperatureValue}>{weatherData.weekly_min_temperature}°C</div>
                </div>
              </div>

              <h2>Weather</h2>
              <div className={styles.hourlyWeatherContainer}>
                {weatherData.weatherCode_hourly.map((code, index) => {
                  const Icon = weatherIcons[code];
                  const isNight = (index + currentHour) % 24 <= 6 || (index + currentHour) % 24 > 20;
                  const hour = (index + currentHour) % 24;

                  return (

                    <div
                      key={index}
                      className={`${styles.hourlyWeatherItem} ${isNight ? styles.night : styles.day}`}
                    >

                      <div style={{ marginBottom: 'auto', fontSize: '1.2em', fontWeight: 'bold' }}>{hour}:00</div>
                      <div style={{ margin: 'auto' }}>
                        {isNight && (code === 0 || code === 1) ? (
                          <div className={styles.invertedIcon}>
                            <MoonIcon />
                          </div>
                        ) : Icon ? (
                          isNight ? (
                            <div className={styles.invertedIcon}>
                              <Icon />
                            </div>
                          ) : (
                            <Icon />
                          )
                        ) : (
                          code
                        )}
                      </div>

                      <div
                        style={{ marginTop: 'auto', fontSize: '1.2em', fontWeight: 'bold' }}
                      >
                        {weatherData.temperature_hourly[index]}°C
                      </div>

                    </div>
                  );
                })}
              </div>
              <div className={styles.alertContainer}>
                {weatherData.daily_min_temperature < 2 && (
                  <div className={styles.alert}>
                    Warning: Cold weather! Minimum temperature today is {weatherData.daily_min_temperature}°C.
                  </div>
                )}
              </div>
              <div className={styles.alertContainer}>
                {weatherData.weekly_max_temperature > 25 && (

                  <div className={styles.alert}>Warning: High temperatures this week!</div>

                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}