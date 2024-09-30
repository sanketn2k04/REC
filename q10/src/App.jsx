import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';




const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('New York');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey=import.meta.env.VITE_API_KEY;


  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
        setWeatherData(response.data);
      } catch (err) {
        setError('Error fetching weather data');
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather Forecast Dashboard</h1>
      <input 
        type="text" 
        value={city} 
        onChange={handleCityChange} 
        placeholder="Enter city name" 
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Enter full city name or {error}</p>
      ) : (
        weatherData && (
          <div>
            <h2>{weatherData.location.name}, {weatherData.location.region}</h2>
            <h2>last updated : {weatherData.current.last_updated}</h2>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Wind Speed: {weatherData.current.wind_mph} mph</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;