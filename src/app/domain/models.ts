import { Task } from './task/task';

export interface SectionHasTasks {
  id: string;
  name: string;
  userId: string;
  orderId: number;
  tasks: Task[];
}
