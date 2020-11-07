export interface Task {
  id: string;
  name: string;
  sectionId: string;
  userId: string;
  orderId: number;
}

export interface SectionHasTasks {
  id: string;
  name: string;
  userId: string;
  orderId: number;
  tasks: Task[];
}
