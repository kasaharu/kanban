export const COLLECTION_NAME = 'tasks';

export interface Task {
  id: string;
  name: string;
  sectionId: string;
  userId: string;
  orderId: number;
  dueDate: string | null;
  description: string;
}
