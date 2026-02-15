export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  profile: File;
  role: string;
  createdAt: Date;
}
