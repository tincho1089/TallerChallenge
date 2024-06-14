import React from 'react';
import ReactDOM from 'react-dom/client';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import './index.scss';
import TodoWindow from './TodoWindow';

function App() {
  return (
    <TaskProvider>
      <ThemeProvider>
        <FilterProvider>
          <TodoWindow />
        </FilterProvider>
      </ThemeProvider>
    </TaskProvider>
  );
}


const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(<App />);
