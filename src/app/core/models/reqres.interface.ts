export interface LoginSuccessful {
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface SingleUserResponse {
  data: IUser;
  support: Support;
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
  support: Support;
}
export interface Support {
  url: string;
  text: string;
}
