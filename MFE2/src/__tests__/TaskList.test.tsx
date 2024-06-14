import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { TaskContext } from '../context/TaskContext';
import { FilterContext } from '../context/FilterContext';
import { ThemeProvider } from '../context/ThemeContext';

const tasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
  { id: 3, title: 'Task 3', completed: false },
];

const CustomFilterProvider = ({ children, filterValue }: { children: ReactNode; filterValue: string }) => {
  const [filter, setFilter] = React.useState(filterValue as 'all' | 'active' | 'completed');
  
  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

const Wrapper = ({ children, filterValue }: { children: ReactNode; filterValue: 'all' | 'active' | 'completed' }) => (
  <TaskContext.Provider
    value={{
      tasks,
      addTask: jest.fn(),
      editTask: jest.fn(),
      deleteTask: jest.fn(),
      toggleCompleted: jest.fn(),
      clearTasks: jest.fn(),
      getCompletedTasks: jest.fn(() => tasks.filter(task => task.completed)),
      getRemainingTasks: jest.fn(() => tasks.filter(task => !task.completed))
    }}
  >
    <ThemeProvider>
      <CustomFilterProvider filterValue={filterValue}>
        {children}
      </CustomFilterProvider>
    </ThemeProvider>
  </TaskContext.Provider>
  
);

test('renders all tasks', () => {
  render(
    <Wrapper filterValue="all">
      <TaskList />
    </Wrapper>
  );

  expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Task 3/i)).toBeInTheDocument();
});

test('renders active tasks only', () => {
  render(
    <Wrapper filterValue="active">
      <TaskList />
    </Wrapper>
  );

  expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
  expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Task 3/i)).toBeInTheDocument();
});

test('renders completed tasks only', () => {
  render(
    <Wrapper filterValue="completed">
      <TaskList />
    </Wrapper>
  );

  expect(screen.queryByText(/Task 1/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  expect(screen.queryByText(/Task 3/i)).not.toBeInTheDocument();
});
