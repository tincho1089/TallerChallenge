import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskForm from '../components/AddTaskForm';
import { TaskProvider } from '../context/TaskContext';
import { ThemeProvider } from '../context/ThemeContext';
import { FilterProvider } from '../context/FilterContext';

test('renders AddTaskForm and allows task submission', () => {
  render(
      <TaskProvider>
        <ThemeProvider>
          <FilterProvider>
              <AddTaskForm />
          </FilterProvider>
        </ThemeProvider>
      </TaskProvider>
  );
  
  const input = screen.getByPlaceholderText(/Add a new task.../i);
  const button = screen.getByText(/Add/i);

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(button);

  expect(input).toHaveValue('');
});
