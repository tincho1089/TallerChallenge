import React from 'react';
import ReactDOM from 'react-dom/client';
import { TaskProvider } from 'MFE2/context/TaskContext';
import { ThemeProvider } from 'MFE2/context/ThemeContext';
import { FilterProvider } from 'MFE2/context/FilterContext';
import TodoWindow from 'MFE2/TodoWindow';

const App = () => (
  <TaskProvider>
    <ThemeProvider>
      <FilterProvider>
          <TodoWindow />
      </FilterProvider>
    </ThemeProvider>
  </TaskProvider>
);

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(<App />);
