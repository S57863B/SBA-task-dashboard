import type { Task, FilterOptions } from '../types/index.ts';

const STORAGE_KEY = 'dashboard_tasks';

// Get tasks from local storage
export const loadTasks = (): Task[] => {
  const savedTasks = localStorage.getItem(STORAGE_KEY);
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Save tasks to local storage
export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Helper to calculate dashboard statistics
export const getTaskStats = (tasks: Task[]) => {
  return tasks.reduce(
    (acc, task) => {
      acc.total += 1;
      if (task.status === 'completed') acc.completed += 1;
      if (task.status === 'in-progress') acc.inProgress += 1;
      if (task.status === 'todo') acc.todo += 1;
      return acc;
    },
    { total: 0, completed: 0, inProgress: 0, todo: 0 }
  );
};

export const filterAndSortTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
  return tasks
    .filter((task) => {
      // Status Filter
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      
      // Priority Filter
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      
      // Search Filter (checks both title and description)
      const searchTerm = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm) || 
        task.description.toLowerCase().includes(searchTerm);

      return matchesStatus && matchesPriority && matchesSearch;
    })
    // Sort by Date (Newest first)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};