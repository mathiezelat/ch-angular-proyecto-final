export interface AuthUser {
  id?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isAdmin?: boolean;
  isActive?: boolean;
}
