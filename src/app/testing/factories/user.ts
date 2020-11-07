import { User } from '../../domain/user/user';

export const userFactory = (params: Partial<User>) => {
  const defaultUser: User = { displayName: '', email: '', phoneNumber: '', photoURL: null, providerId: '', uid: '' };
  return { ...defaultUser, ...params };
};
