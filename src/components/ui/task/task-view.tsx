import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../input";
import { Label } from "../label";
import Dialog from "../dialog";
import {
  taskListStoreSchema,
  taskListStoreSchemaFormProps,
} from "@/validations/task-list-validate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/use-auth";
import { useTaskList } from "@/contexts/use-task-list";
import { ProjectInterface } from "@/interfaces/project-interface";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog";
import { Button } from "../button";
import { TaskInterface } from "@/interfaces/task-interface";
import { List } from "lucide-react";
import { handleGetFirstChar, randomColor } from "@/lib/utils";
import CategoryIcon from "../icons/category-icon";
import { useTask } from "@/contexts/use-task";
import { StatusInterface } from "@/interfaces/status-interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

interface TaskViewProps extends React.HTMLAttributes<HTMLDivElement> {
  task: TaskInterface;
  statuses: StatusInterface[];
  setTasks: Dispatch<SetStateAction<TaskInterface[] | undefined>>;
}

const TaskView = ({ task, setTasks, statuses, ...rest }: TaskViewProps) => {
  const { user } = useAuth();
  const { taskUpdate } = useTask();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<taskListStoreSchemaFormProps>({
    resolver: zodResolver(taskListStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleUpdateStatusTask = (task: TaskInterface, statusId: number) => {
    taskUpdate(task.workspace.id, task.project.id, task.task_list_id, task.id, {
      status_id: statusId,
    }).then((updatedTask) => {
      setTasks((prev) =>
        (prev ?? []).map((t) => (t.id === task.id ? updatedTask : t))
      );
    });
  };

  return (
    <div {...rest} className={twMerge("", rest.className)}>
      <AlertDialog onOpenChange={setOpen} open={open}>
        <Button
          className={` bg-transparent p-0 hover:text-electric-violet-500 hover:bg-transparent`}
          onClick={() => setOpen(true)}
        >
          {task.name}
        </Button>
        <AlertDialogContent className="bg-shark-900 border divide-y divide-shark-800 border-shark-900 p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="p-4 bg-shark-950 rounded-t-lg">
              <div className="flex flex-row items-center gap-4">
                <div>
                  <span
                    className={`mr-2 border  text-white px-2.5 py-1 rounded-md font-bold text-sm`}
                    style={{
                      backgroundColor: randomColor(),
                      border: randomColor(),
                    }}
                  >
                    {handleGetFirstChar(task.project.name)}
                  </span>
                  <span>{task.project.name}</span>
                </div>
                <span className="text-sm text-shark-400">/</span>
                <span className="flex items-center">
                  <List className="w-4 h-4 opacity-50 mr-2" />
                  {task.task_list_name}
                </span>
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="p-4">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {" "}
                    <CategoryIcon
                      width={18}
                      height={18}
                      style={{
                        fill: task.status.color,
                      }}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-shark-800 border-shark-800 text-shark-200">
                    {statuses.map((status) => (
                      <DropdownMenuItem
                        key={status.id}
                        className="cursor-pointer hover:bg-shark-900"
                        onClick={() => handleUpdateStatusTask(task, status.id)}
                      >
                        <CategoryIcon
                          width={18}
                          height={18}
                          style={{
                            fill: status.color,
                          }}
                          className="mr-2"
                        />
                        {status.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="p-4">
            <AlertDialogCancel className="text-shark-950">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-electric-violet-500 hover:bg-electric-violet-500/75"
              onClick={() => {}}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default memo(TaskView);
