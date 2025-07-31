import { motion } from 'framer-motion';

const SearchHistory = ({ history, onSelect, theme }) => {
  if (history.length === 0) return null;

  return (
    <div className={rounded-xl p-6 shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}}>
      <h3 className="text-xl font-bold mb-4">Recent Searches</h3>
      <ul className="space-y-2">
        {history.map((city, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <button
              onClick={() => onSelect(city)}
              className={w-full text-left p-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 hover:text-white' : ''}}
            >
              {city}
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
