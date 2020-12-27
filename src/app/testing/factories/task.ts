import { Task } from '../../domain/task/task';

export const taskFactory = (params: Partial<Task>) => {
  const defaultTask: Task = { id: '', name: '', sectionId: '', userId: '', orderId: 1 };
  return { ...defaultTask, ...params };
};
