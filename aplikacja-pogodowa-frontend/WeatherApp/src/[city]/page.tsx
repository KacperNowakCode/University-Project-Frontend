import React from 'react';
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Weather Data for {slug}</h1>
          {weatherData && (
            <table style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left', marginBottom: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f4f4f4' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Daily Max Temperature</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{weatherData.daily_max_temperature}°C</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Daily Min Temperature</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{weatherData.daily_min_temperature}°C</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Weekly Max Temperature</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{weatherData.weekly_max_temperature}°C</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Weekly Min Temperature</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{weatherData.weekly_min_temperature}°C</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>Most Common Weather Code</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{weatherData.most_common_weather_code}</td>
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
                  width: '100%',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: '#f4f4f4' }}>
                    {weatherData.weatherCode_hourly.map((_, index) => (
                      <th key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                        Hour {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {weatherData.temperature_hourly.map((temp, index) => (
                      <td key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {temp}°C
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {weatherData.weatherCode_hourly.map((code, index) => (
                      <td key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                        {code}
                      </td>
                    ))}
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    {weatherData.temperature_hourly.map((_, index) => (
                      <td key={index} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f9f9f9' }}>
                        {index}:00
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
