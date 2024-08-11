import { PaginateInterface } from "./paginate-interface";

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  role: string;
  workspace: {
    id: number;
    name: string;
  };
}

export interface UsersInterface extends PaginateInterface {
  data: UserInterface[];
}
