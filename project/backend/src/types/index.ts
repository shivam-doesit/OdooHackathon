export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface RequestWithUser extends Request {
  user?: User;
}