import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useTaskContext } from '../context/TaskContext';

interface TaskProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const { editTask, deleteTask, toggleCompleted } = useTaskContext();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setTitle(task.title);
  };

  const handleDone = () => {
    if (title.trim()) {
      editTask(task.id, title.trim());
      setEditing(false);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteTask(task.id);
  };

  const handleToggleCompleted = () => {
    toggleCompleted(task.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <li className="mb-1 border-b border-gray-300 space-y-2">
      {editing ? (
        <form onSubmit={handleDone} className="flex items-center justify-between p-1 px-3 w-full">
          <div className="flex items-center space-x-3 w-full">
            <input
              type="text"
              value={title}
              onChange={handleChange}
              className="w-full bg-transparent py-3 text-lg"
            />
          </div>
          <div className="flex space-x-3">
            <button type="submit" aria-label="done">
              <MdOutlineDone size={20} className="hover:text-green-400 text-gray-500" />
            </button>
            <button type="button" onClick={handleCancel} aria-label="cancel">
              <RxCross2 size={20} className="text-gray-500 hover:text-orange-400" />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between p-4 px-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleCompleted}
              className="round rounded-none"
            />
            <span className={` ${task.completed ? 'line-through text-gray-500 text-lg' : 'text-lg'} `}>
              {task.title}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={handleEdit} aria-label="edit">
              <CiEdit size={20} className="text-gray-500 hover:text-yellow-500" />
            </button>
            <button onClick={handleDelete} aria-label="delete">
              <AiOutlineDelete size={18} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default Task;
