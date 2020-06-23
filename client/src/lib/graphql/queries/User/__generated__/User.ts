export interface User_user {
  __typename: 'User';
  id: string;
  name: string;
  avatar: string;
  contact: string;
  hasWallet: boolean;
  income: number | null;
}
export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
}
