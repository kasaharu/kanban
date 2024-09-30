export const COLLECTION_NAME = 'tasks';

export interface Task {
  id: string;
  name: string;
  sectionId: string;
  ownerId: string;
  orderId: number;
  dueDate: string | null;
  description: string;
  isCompleted: boolean;
  createdAt: number; // NOTE: 経過時間ミリ秒で管理
}
