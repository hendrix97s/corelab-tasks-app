import { ProjectInterface } from "./project-interface";
import { StatusInterface } from "./status-interface";
import { TaskListInterface } from "./task-list-interface";
import { UserInterface } from "./user-interface";
import { WorkspaceInterface } from "./workspace-interface";

export interface TaskInterface {
  id: number;
  name: string;
  description?: string;
  status: StatusInterface;
  project: ProjectInterface;
  workspace: WorkspaceInterface;
  task_list: TaskListInterface;
  expires_at?: string;
  priority: number;
  assignable?: UserInterface;
  task_list_id: number;
  task_list_name: string;
}
