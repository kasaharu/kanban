import { Task } from './task/task';

export interface SectionHasTasks {
  id: string;
  name: string;
  ownerId: string;
  orderId: number;
  tasks: Task[];
}
