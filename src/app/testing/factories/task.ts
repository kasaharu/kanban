import { Task } from '../../domain/task/task';

export const taskFactory = (params: Partial<Task>) => {
  const defaultTask: Task = { id: '', name: '', sectionId: '', ownerId: '', orderId: 1, dueDate: null, description: '' };
  return { ...defaultTask, ...params };
};
