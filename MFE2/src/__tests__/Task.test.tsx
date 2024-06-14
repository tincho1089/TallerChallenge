import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Task from '../components/Task';
import { TaskProvider } from '../context/TaskContext';
import { ThemeProvider } from '../context/ThemeContext';
import { FilterProvider } from '../context/FilterContext';

const mockEditTask = jest.fn();
const mockDeleteTask = jest.fn();
const mockToggleCompleted = jest.fn();

const task = { id: 1, title: 'Test Task', completed: false };

const Wrapper = ({ children }: { children: ReactNode }) => (
  <TaskProvider
    value={{
      tasks: [task],
      addTask: jest.fn(),
      editTask: mockEditTask,
      deleteTask: mockDeleteTask,
      toggleCompleted: mockToggleCompleted,
      clearTasks: jest.fn(),
      getCompletedTasks: jest.fn(() => []),
      getRemainingTasks: jest.fn(() => [])
    }}
  >
    <ThemeProvider>
      <FilterProvider>{children}</FilterProvider>
    </ThemeProvider>
  </TaskProvider>
);

test('renders Task component', () => {
  render(
    <Wrapper>
      <Task task={task} />
    </Wrapper>
  );

  expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
});

test('toggles task completion', () => {
  render(
    <Wrapper>
      <Task task={task} />
    </Wrapper>
  );

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(mockToggleCompleted).toHaveBeenCalledWith(task.id);
});

test('edits a task', () => {
  render(
    <Wrapper>
      <Task task={task} />
    </Wrapper>
  );

  const editButton = screen.getByLabelText(/edit/i);
  fireEvent.click(editButton);

  const input = screen.getByDisplayValue(/Test Task/i);
  fireEvent.change(input, { target: { value: 'Updated Task' } });

  const form = input.closest('form');
  if (form) {
    fireEvent.submit(form);
  }

  expect(mockEditTask).toHaveBeenCalledWith(task.id, 'Updated Task');
});

test('deletes a task', () => {
  render(
    <Wrapper>
      <Task task={task} />
    </Wrapper>
  );

  const deleteButton = screen.getByLabelText(/delete/i);
  fireEvent.click(deleteButton);

  expect(mockDeleteTask).toHaveBeenCalledWith(task.id);
});
