import React, { useState, useEffect } from 'react';

// Types
import type { Task, FilterOptions, TaskStatus } from '../../types/index.ts';

// Utilities
import { loadTasks, saveTasks, filterAndSortTasks, getTaskStats } from '../../utils/taskUtils.ts';

// Components
import { TaskForm } from '../TaskForm/TaskForm.tsx';
import { TaskList } from '../TaskList/TaskList.tsx';
import { TaskFilter } from '../TaskFilter/TaskFilter.tsx';

export const Dashboard: React.FC = () => {
  // 1. Core State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    searchQuery: '',
  });

  // 2. Load initial data on mount
  useEffect(() => {
    setTasks(loadTasks());
    setIsLoaded(true);
  }, []);

  // 3. Save data whenever tasks change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  // 4. State Handlers
  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  // 5. Derived State (Calculated on every render)
  const filteredTasks = filterAndSortTasks(tasks, filters);
  const stats = getTaskStats(tasks);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {/* --- Header & Statistics --- */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-gray-500">
            <p className="text-sm text-gray-500 dark:text-gray-400">To Do</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todo}</p>
          </div>
        </div>
      </header>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar: Forms & Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <TaskForm onAdd={handleAddTask} />
          <TaskFilter filters={filters} setFilters={setFilters} />
        </aside>

        {/* Main Area: Task List */}
        <main className="lg:col-span-2">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Tasks</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredTasks.length} of {tasks.length}
            </span>
          </div>
          
          <TaskList
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </main>
        
      </div>
    </div>
  );
};