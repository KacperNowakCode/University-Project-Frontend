import React from 'react'

import { useParams } from 'react-router-dom';
      interface CityData {
        most_common_weather_code: number;
        weekly_generated_energy: number;
        daily_min_temperature: number[];
        average_surface_pressure: number;
        daily_max_temperature: number[];
        weekly_max_temperature: number;
        daily_generated_energy: number[];
        sunshineHours: number[];
        weekly_min_temperature: number;
        average_sunshine_hours: number;
      }

export default function SlugPage() {
    const [weatherData, setweatherData] = React.useState<CityData>()
    const [loading, setLoading] = React.useState<boolean>(true)
    const { slug } = useParams();
  
    React.useEffect(() => {
      console.log('Fetching data from server...')
      
  
      const fetchData = async () => {
        setLoading(true);
        if(slug == null){
            return
        }
        const cityData = await getData(slug);
        
  
        if (cityData) {
          // Set the state with the array of data fetched
          setweatherData(cityData);
        }
        else {
          console.log('Error fetching data')
        }
        setLoading(false);
      };
      fetchData();
      
    }, []);
  
    const getData = async (city: string) => {
      try {
        const data = await fetch(`http://localhost:8080/api/weather/${city}`);
        if (!data.ok) {
          throw new Error('Failed to fetch data');
        }
        return data.json() as Promise<CityData>;
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1>City Data</h1>
            <h1>hujek</h1>
            {/* Access the second value */}
            <p> Daily max temp: {weatherData?.daily_max_temperature ?? 'Not available'}</p>
          </div>
        )}
      </div>
    );
  }
