import type { Task } from '../types/index.ts';

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