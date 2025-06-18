import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const Home = () => {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white p-4 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4">ZeroCode Chatbot</h1>
      <p className="mb-6">Welcome to the chatbot demo project</p>
      <div className="space-x-4 mb-4">
        <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Register</Link>
      </div>
      <button
        onClick={toggleDark}
        className="mt-4 px-4 py-2 bg-gray-800 text-white dark:bg-yellow-300 dark:text-black rounded transition"
      >
        Toggle {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default Home;
