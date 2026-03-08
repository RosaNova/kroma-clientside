export interface FeedBack {
  _id: string;
  star: number;
  description: string;
  user: User;
  feedback_img: string;
  createdAt: Date;
}
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}
