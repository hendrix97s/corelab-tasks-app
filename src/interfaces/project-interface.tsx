import { StatusInterface } from "./status-interface";
import { TaskListInterface } from "./task-list-interface";

export interface ProjectInterface {
  id: number;
  name: string;
  statuses: StatusInterface[];
  lists: TaskListInterface[];
}
