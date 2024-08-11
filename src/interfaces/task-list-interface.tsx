import { ProjectInterface } from "./project-interface";

export interface TaskListInterface {
  id: number;
  name: string;
  project: ProjectInterface;
}
