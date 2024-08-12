import { Dispatch, memo, SetStateAction } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import { cn } from "@/lib/utils";
import CategoryIcon from "../icons/category-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import Image from "next/image";
import { TaskInterface } from "@/interfaces/task-interface";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { StatusInterface } from "@/interfaces/status-interface";
import { useTask } from "@/contexts/use-task";
import TaskFormCreate from "./task-form-create";
import { TaskListInterface } from "@/interfaces/task-list-interface";

interface TasksProps extends React.HTMLAttributes<HTMLDivElement> {
  taskList: TaskListInterface | undefined;
  statuses: StatusInterface[];
  tasks: TaskInterface[] | undefined;
  setTasks: Dispatch<SetStateAction<TaskInterface[] | undefined>>;
  status: StatusInterface;
  value: string;
}

const Tasks = ({
  statuses,
  tasks,
  setTasks,
  taskList,
  status,
  value,
  ...rest
}: TasksProps) => {
  const { taskUpdate } = useTask();

  const handleUpdateStatusTask = (task: TaskInterface, statusId: number) => {
    console.log("handleUpdateStatusTask:", task, statusId);
    taskUpdate(task.workspace.id, task.project.id, task.task_list_id, task.id, {
      status_id: statusId,
    }).then((updatedTask) => {
      setTasks((prev) =>
        (prev ?? []).map((t) => (t.id === task.id ? updatedTask : t))
      );
    });
  };

  return (
    <AccordionItem
      {...rest}
      value={value}
      className={cn(" border-none ", rest.className)}
    >
      <div className="flex items-center gap-2 sticky top-0 bg-shark-950 z-10 py-4">
        <AccordionTrigger className="w-4 h-4 bg-shark-800 rounded-sm py-0" />

        <div
          className=" w-fit py-1.5 px-2 rounded-lg flex items-center gap-2"
          style={{ backgroundColor: status.color }}
        >
          <CategoryIcon width={18} height={18} className="fill-white" />
          <span className="font-semibold text-xs">{status.name}</span>
        </div>

        <TaskFormCreate
          taskList={taskList}
          setTasks={setTasks}
          ghost={true}
          statusId={status.id}
        />
      </div>

      <AccordionContent className="flex flex-row gap-2 items-center">
        <Table className="">
          <TableHeader className="divide-shark-900 border-shark-900">
            <TableRow className="hover:bg-shark-950  divide-shark-800 border-shark-800 ">
              <TableHead className=" text-shark-400 pl-1">Nome</TableHead>
              <TableHead className="text-shark-400">Responsável</TableHead>
              <TableHead className="text-shark-400">
                Data de vencimento
              </TableHead>
              <TableHead className="text-right text-shark-400">
                Prioridade
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-shark-900 text-shark-400">
            {tasks &&
              tasks.map((task) => (
                <TableRow
                  key={task.id}
                  className="hover:bg-shark-900/50 border-shark-900 "
                >
                  <TableCell className="py-1 pl-8 min-w-96">
                    <div className="flex tasks-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          {" "}
                          <CategoryIcon
                            width={18}
                            height={18}
                            style={{
                              fill: status.color,
                            }}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-shark-800 border-shark-800 text-shark-200">
                          {statuses.map((status) => (
                            <DropdownMenuItem
                              key={status.id}
                              className="cursor-pointer hover:bg-shark-900"
                              onClick={() =>
                                handleUpdateStatusTask(task, status.id)
                              }
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

                      <span className="text-shark-200 font-semibold">
                        {task.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-1">
                    <Image
                      src={`https://api.dicebear.com/9.x/bottts/svg?seed=${
                        task.assignable?.name ?? "Felix"
                      }`}
                      width={500}
                      height={500}
                      alt="Felix"
                      className="w-8"
                    />
                  </TableCell>
                  <TableCell className="py-1">x</TableCell>
                  <TableCell className="text-right py-1">
                    {task.priority}
                  </TableCell>
                </TableRow>
              ))}
            <TableRow className="hover:bg-transparent">
              <TableCell>
                <TaskFormCreate
                  taskList={taskList}
                  setTasks={setTasks}
                  ghost={true}
                  statusId={status.id}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default memo(Tasks);
