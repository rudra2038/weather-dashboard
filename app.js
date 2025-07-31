import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import SearchHistory from './components/SearchHistory';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [theme, setTheme] = useState('light');

  const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
      );
      setWeatherData(response.data);
      
      // Update search history
      setSearchHistory(prev => {
        const newHistory = [city, ...prev.filter(item => item !== city)];
        return newHistory.slice(0, 5);
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <button 
            onClick={toggleTheme}
            className={px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}}
          >
            {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        <SearchBar onSearch={fetchWeather} loading={loading} theme={theme} />
        
        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className={p-4 mb-4 rounded-lg ${theme === 'dark' ? 'bg-red-900' : 'bg-red-100'} text-red-700}>
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <WeatherDisplay weatherData={weatherData} theme={theme} onRefresh={() => weatherData && fetchWeather(weatherData.name)} />
          </div>
          <div>
            <SearchHistory 
              history={searchHistory} 
              onSelect={fetchWeather} 
              theme={theme} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
