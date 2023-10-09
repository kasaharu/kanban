import { User as FirebaseUser } from '@angular/fire/auth';

export interface User {
  // NOTE: firebase.User
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

export const extractUserInfo = (user: FirebaseUser | null): User | null => {
  return user
    ? {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerId: user.providerId,
        uid: user.uid,
      }
    : null;
};
