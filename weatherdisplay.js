import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'react-icons/wi';
import { FiRefreshCw } from 'react-icons/fi';

const WeatherDisplay = ({ weatherData, theme, onRefresh }) => {
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny className="text-yellow-500" size={80} />;
      case 'Rain':
        return <WiRain className="text-blue-400" size={80} />;
      case 'Snow':
        return <WiSnow className="text-blue-200" size={80} />;
      case 'Clouds':
        return <WiCloudy className="text-gray-400" size={80} />;
      case 'Thunderstorm':
        return <WiThunderstorm className="text-purple-500" size={80} />;
      case 'Mist':
      case 'Fog':
      case 'Haze':
        return <WiFog className="text-gray-300" size={80} />;
      default:
        return <WiDaySunny className="text-yellow-500" size={80} />;
    }
  };

  if (!weatherData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={rounded-xl p-6 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <button 
          onClick={onRefresh}
          className={p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}}
          title="Refresh"
        >
          <FiRefreshCw />
        </button>
      </div>
      
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            {getWeatherIcon(weatherData.weather[0].main)}
          </div>
          <div>
            <div className="text-5xl font-bold">{Math.round(weatherData.main.temp)}°C</div>
            <div className="capitalize">{weatherData.weather[0].description}</div>
          </div>
        </div>
        
        <div className={mt-4 md:mt-0 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">Feels Like</div>
              <div>{Math.round(weatherData.main.feels_like)}°C</div>
            </div>
            <div>
              <div className="font-semibold">Humidity</div>
              <div>{weatherData.main.humidity}%</div>
            </div>
            <div>
              <div className="font-semibold">Wind Speed</div>
              <div>{weatherData.wind.speed} km/h</div>
            </div>
            <div>
              <div className="font-semibold">Pressure</div>
              <div>{weatherData.main.pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;
