import React from 'react';
import type { FilterOptions, TaskStatus, TaskPriority } from '../../types/index.ts';

interface TaskFilterProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ filters, setFilters }) => {
  // Helper to handle input changes cleanly
  const handleChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filter Tasks</h2>
      
      <div className="space-y-4">
        {/* Search Bar */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
          <input
            type="text"
            id="search"
            value={filters.searchQuery}
            onChange={(e) => handleChange('searchQuery', e.target.value)}
            placeholder="Search tasks..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            id="statusFilter"
            value={filters.status}
            onChange={(e) => handleChange('status', e.target.value as TaskStatus | 'all')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
          <select
            id="priorityFilter"
            value={filters.priority}
            onChange={(e) => handleChange('priority', e.target.value as TaskPriority | 'all')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};