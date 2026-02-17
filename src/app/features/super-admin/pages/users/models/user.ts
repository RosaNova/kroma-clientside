export interface adminUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  profile: File;
  role: string;
  createdAt: Date;
  phone: string;
  profile_url: string;
}
