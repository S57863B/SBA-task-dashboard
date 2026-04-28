import React from 'react';
import type { Task, TaskStatus } from '../../types/index.ts';
import { TrashIcon } from '@heroicons/react/24/outline';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onStatusChange }) => {
  // Helper to determine priority badge colors
  const getPriorityColors = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md">
      {/* Task Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
            {task.title}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityColors(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">{task.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Task Actions */}
      <div className="flex items-center gap-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-1.5">
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
          aria-label="Delete task">
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};  