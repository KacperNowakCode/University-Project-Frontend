import React from 'react';
import { useParams } from 'react-router-dom';
import SunIcon from './icons/SunIcon';
import RainIcon from './icons/RainIcon';
import CloudIcon from './icons/CloudIcon';
import FogIcon from './icons/FogIcon';
import SnowIcon from './icons/SnowIcon';
import ThunderIcon from './icons/ThunderIcon';
import styles from "./Styles2.module.css";
import MoonIcon from './icons/MoonIcon';

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
  100: MoonIcon,
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

        //if (data.daily_min_temperature < 2) {
          //alert('Uwaga na zimną pogodę! Minimalna temperatura dzisiaj wynosi ' + data.daily_min_temperature + '°C.');
        //}
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
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className={styles.title}>Weather Data for {slug?.toUpperCase()}</h1>
          <h2 style={{paddingTop: '200px', textAlign: 'center'}}>Weekly Data</h2>
          {weatherData && (
            <table style={{ borderCollapse: 'collapse', width: '40%', textAlign: 'left', marginBottom: '20px', marginTop: '20px', marginLeft: '30%' }}>
              <thead>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tablerow}>Daily Max Temperature</td>
                  <td className={styles.tablerow}>{weatherData.daily_max_temperature}°C</td>
                </tr>
                <tr>
                  <td className={styles.tablerow}>Daily Min Temperature</td>
                  <td className={styles.tablerow}>{weatherData.daily_min_temperature}°C</td>
                </tr>
                <tr>
                  <td className={styles.tablerow}>Weekly Max Temperature</td>
                  <td className={styles.tablerow}>{weatherData.weekly_max_temperature}°C</td>
                </tr>
                <tr>
                  <td className={styles.tablerow}>Weekly Min Temperature</td>
                  <td className={styles.tablerow}>{weatherData.weekly_min_temperature}°C</td>
                </tr>
                <tr>
                  <td className={styles.tablerow}>Most Common Weather Code</td>
                  <td className={styles.tablerow}>
                    {weatherIcons[weatherData.most_common_weather_code] ? React.createElement(weatherIcons[weatherData.most_common_weather_code]) : weatherData.most_common_weather_code}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {weatherData && (
            <div>
              <h2>Hourly Data</h2>
              <table
                style={{
                  borderCollapse: 'collapse',
                  width: '90%',
                  textAlign: 'center',
                  marginBottom: '20px',
                  marginLeft: '5%',
                }}
              >
                <thead>
                </thead>
                <tbody>
                  <tr>
                    {weatherData.weatherCode_hourly.map((code, index) => {
                      const Icon = weatherIcons[code];
                      if(((index + currentHour) % 24 <= 6 || (index + currentHour) % 24 >= 20) && (code == 0 || code == 1)){
                        return <td key={index} className={styles.night}>
                        <MoonIcon></MoonIcon>
                                            </td>;
                      }
                      else if ((index + currentHour) % 24 <= 6 || (index + currentHour) % 24 >= 20) {
                        return <td key={index} className={styles.night}>
                        {Icon ? <Icon /> : code}
                                            </td>;
                      }
                      else{
                        return <td key={index} className={styles.tablerow}>
                        {Icon ? <Icon /> : code}
                      </td>
                      }
                    })}
                  </tr>
                  <tr>
                    {weatherData.temperature_hourly.map((temp, index) => (
                      <td key={index} className={styles.tablerow}>
                        {temp}°C
                      </td>
                    ))}
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    {weatherData.temperature_hourly.map((_, index) => (
                      <td key={index} className={styles.tablerow}>
                        {(index + currentHour) % 24}:00
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
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
            
          )}
        </div>
      )}
    </div>
  );
}
