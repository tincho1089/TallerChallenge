import React from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { MdDarkMode, MdSunny } from 'react-icons/md';
import { useThemeContext } from './context/ThemeContext';
import { useFilterContext } from './context/FilterContext';
import './index.scss';

const TodoWindow = () => {
  const { darkTheme, toggleTheme } = useThemeContext();
  const { filter, setFilter } = useFilterContext();

  return (
    <div
      className={`hero ${
        darkTheme ? 'bg-gray-900' : 'bg-gray-100'
      } h-screen md:min-h-[700px] w-full m-auto flex flex-col items-center mt-14 transition-all duration-500`}
    >
      <div
        className={`flex flex-col space-y-6 w-[600px] md:w-[100%] z-10 p-4 ${
          darkTheme ? 'text-white' : 'text-black'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          <h1 className="uppercase text-4xl font-bold text-white tracking-widest mb-4 md:text-3xl">
            My Tasks
          </h1>

          {darkTheme ? (
            <MdSunny
              onClick={toggleTheme}
              className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg bottom-5 right-5 ${
                darkTheme ? 'text-white' : 'text-black'
              }`}
              size={32}
            />
          ) : (
            <MdDarkMode
              onClick={toggleTheme}
              className={`bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg bottom-5 right-5 ${
                darkTheme ? 'text-white' : 'text-black'
              }`}
              size={32}
            />
          )}
        </div>
        <div className="shadow-md">
          <AddTaskForm />
        </div>
        <div className="flex justify-center space-x-4 py-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full transition-all duration-300 shadow-md ${
              filter === 'all'
                ? darkTheme
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkTheme
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full transition-all duration-300 shadow-md ${
              filter === 'active'
                ? darkTheme
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkTheme
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full transition-all duration-300 shadow-md ${
              filter === 'completed'
                ? darkTheme
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
                : darkTheme
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Completed
          </button>
        </div>
        <div
          className={`scroll ${
            darkTheme ? 'bg-gray-800' : 'bg-white'
          } w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500`}
        >
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default TodoWindow;
