import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (title: string) => void;
  editTask: (id: number, title: string) => void;
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
  clearTasks: () => void;
  getCompletedTasks: () => Task[];
  getRemainingTasks: () => Task[];
}

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const isLocalStorageAvailable = () => {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.error('localStorage is not available', error);
    return false;
  }
};

export const TaskProvider = ({ children, value = {} }: { children: ReactNode; value?: Partial<TaskContextProps> }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (isLocalStorageAvailable()) {
      try {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
      } catch (error) {
        console.error('Failed to load tasks from localStorage', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to localStorage', error);
      }
    }
  }, [tasks]);

  const addTask = value.addTask || ((title: string) => {
    if (!title.trim()) {
      console.error('Task title cannot be empty');
      return;
    }
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
  });

  const editTask = value.editTask || ((id: number, title: string) => {
    if (!title.trim()) {
      console.error('Task title cannot be empty');
      return;
    }
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  });

  const deleteTask = value.deleteTask || ((id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  });

  const toggleCompleted = value.toggleCompleted || ((id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  });

  const clearTasks = value.clearTasks || (() => {
    setTasks([]);
  });

  const getCompletedTasks = value.getCompletedTasks || (() => tasks.filter((task) => task.completed));
  const getRemainingTasks = value.getRemainingTasks || (() => tasks.filter((task) => !task.completed));

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        toggleCompleted,
        clearTasks,
        getCompletedTasks,
        getRemainingTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
