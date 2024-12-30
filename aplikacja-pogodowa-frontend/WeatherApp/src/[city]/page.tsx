import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Pagestyle.module.css';

interface CityData {
  weatherCode_hourly: number[];
  temperature_hourly: number[];
  most_common_weather_code: number;
  daily_min_temperature: number;
  daily_max_temperature: number;
  weekly_max_temperature: number;
  weekly_min_temperature: number;
}

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

        if (data.daily_min_temperature < 2) {
          alert('Uwaga na zimną pogodę! Minimalna temperatura dzisiaj wynosi ' + data.daily_min_temperature + '°C.');
        }
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

  const averageTemperature = weatherData
    ? (weatherData.temperature_hourly.reduce((a, b) => a + b, 0) / weatherData.temperature_hourly.length).toFixed(1)
    : null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Weather for {slug}</h1>
      </header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        weatherData && (
          <div className={styles.weatherInfo}>
            <h2>Average Temperature: {averageTemperature}°C</h2>
            <p>L: {weatherData.weekly_min_temperature}°C</p>
            <p>H: {weatherData.weekly_max_temperature}°C</p>
            <div className={styles.weatherDetails}>
              {weatherData.temperature_hourly.map((temp, index) => (
                <div key={index} className={styles.hourlyWeather}>
                  <p className={styles.category}>{`${index}:00`}</p>
                  <p className={styles.value}>{temp}°C</p>
                  <p className={styles.value}>Code: {weatherData.weatherCode_hourly[index]}</p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}