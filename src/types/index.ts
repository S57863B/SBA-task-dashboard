export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string; // ISO date string
}

export interface FilterOptions {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  searchQuery: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
}