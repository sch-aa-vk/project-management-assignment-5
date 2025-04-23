export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}