import { StatusInterface } from "./status-interface";

export interface ProjectInterface {
  id: string;
  name: string;
  statuses: StatusInterface[];
}
