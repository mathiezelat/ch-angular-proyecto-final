export interface AuthUser {
  id?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  avatar?: string;
  isAdmin?: boolean;
  isActive?: boolean;
}
