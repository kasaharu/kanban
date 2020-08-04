export interface User {
  // NOTE: firebase.User
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export interface Section {
  id: string;
  name: string;
  userId: string;
  orderId: number;
}

export interface Task {
  id: string;
  name: string;
  sectionId: string;
  userId: string;
  orderId: number;
}
