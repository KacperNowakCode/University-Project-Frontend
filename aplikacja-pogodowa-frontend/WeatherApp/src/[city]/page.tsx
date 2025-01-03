import React from 'react';
import { useParams } from 'react-router-dom';
import SunIcon from './icons/SunIcon';
import RainIcon from './icons/RainIcon';
import CloudIcon from './icons/CloudIcon';
import FogIcon from './icons/FogIcon';
import SnowIcon from './icons/SnowIcon';
import ThunderIcon from './icons/ThunderIcon';
import MoonIcon from './icons/MoonIcon';
import styles from "./Pagestyle.module.css";

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
  const [weatherData, setWeatherData] = React.useState<CityData>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { slug } = useParams();

  React.useEffect(() => {
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
        throw new Error('Failed to fetch data');
      }
      return response.json() as Promise<CityData>;
    } catch (error) {
      console.error('Error fetching data', error);
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
            {slug?.toUpperCase()}{' '}
            {weatherData && weatherIcons[weatherData.most_common_weather_code] ? (
              React.createElement(weatherIcons[weatherData.most_common_weather_code])
            ) : null}
          </h1>

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
                    <div key={index} className={`${styles.hourlyWeatherItem} ${isNight ? styles.night : styles.day}`}>
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
                      <div style={{ marginTop: 'auto', fontSize: '1.2em', fontWeight: 'bold' }}>{weatherData.temperature_hourly[index]}°C</div>
                    </div>
                  );
                })}
              </div>

              {/* Alerts below hourly weather */}
              <div className={styles.alertContainer}>
                {weatherData.daily_min_temperature < 2 && (
                  <div className={styles.alert}>
                    Warning: Cold weather! Minimum temperature today is {weatherData.daily_min_temperature}°C.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}