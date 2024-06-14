import React from 'react';
import Task from './Task';
import { useTaskContext } from '../context/TaskContext';
import { useFilterContext } from '../context/FilterContext';

const TaskList: React.FC = () => {
  const { tasks } = useTaskContext();
  const { filter } = useFilterContext();
  let filteredTasks = tasks;

  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  const reversedTasks = filteredTasks.slice().reverse();

  return (
    <ul>
      {reversedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
        />
      ))}
    </ul>
  );
};

export default TaskList;
