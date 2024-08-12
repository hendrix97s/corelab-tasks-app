import { UserInterface } from "./user-interface";

export interface CommentInterface {
  id: number;
  content: string;
  user: UserInterface;
}
