import { handleGetFirstChar, randomColor } from "@/lib/utils";
import { List } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../input";
import { TaskListInterface } from "@/interfaces/task-list-interface";
import TaskFormCreate from "./task-form-create";
import { TaskInterface } from "@/interfaces/task-interface";

interface TaskHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  taskList: TaskListInterface | undefined;
  setTasks: Dispatch<SetStateAction<TaskInterface[] | undefined>>;
}

const TaskHeader = ({ taskList, setTasks, ...rest }: TaskHeaderProps) => {
  return (
    <div {...rest} className={twMerge("", rest.className)}>
      <nav className="h-16 border-b border-shark-800 flex items-center justify-between px-5">
        <div className="flex flex-row items-center gap-4">
          <div>
            <span
              className={`mr-2 border  text-white px-2.5 py-1 rounded-md font-bold text-sm`}
              style={{
                backgroundColor: randomColor(),
                border: randomColor(),
              }}
            >
              {handleGetFirstChar(taskList?.project.name!)}
            </span>
            <span>{taskList?.project.name}</span>
          </div>
          <span className="text-sm text-shark-400">/</span>
          <span className="flex items-center">
            <List className="w-4 h-4 opacity-50 mr-2" />
            {taskList?.name}
          </span>
        </div>
        <div className="flex gap-2">
          <Input
            className="bg-shark-950 border-shark-900 w-fit"
            placeholder="Pesquisar tarefas..."
          />
          <TaskFormCreate taskList={taskList} setTasks={setTasks} />
        </div>
      </nav>
    </div>
  );
};

export default memo(TaskHeader);
