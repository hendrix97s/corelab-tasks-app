"use client";

import Comments from "@/components/comments";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CategoryIcon from "@/components/ui/icons/category-icon";
import Corelab from "@/components/ui/icons/corelab";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/use-auth";
import { useComment } from "@/contexts/use-comment";
import { useTask } from "@/contexts/use-task";
import { CommentInterface } from "@/interfaces/comment-interface";
import { TaskInterface } from "@/interfaces/task-interface";
import {
  getPriorityByIndex,
  handleGetFirstChar,
  randomColor,
} from "@/lib/utils";
import {
  initializeCommentListener,
  removeCommentListener,
} from "@/listeners/comment-listener";
import {
  Calendar,
  CircleDot,
  FlagTriangleLeft,
  FlagTriangleRight,
  List,
  Menu,
  MessageSquare,
} from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type TaskPageProps = {
  params: {
    id: string;
    project_id: string;
    list_id: string;
    task_id: string;
  };
};

const TaskPage = ({ params }: TaskPageProps) => {
  const { user } = useAuth();
  const { taskShow, taskUpdate } = useTask();
  const [task, setTask] = useState<TaskInterface>();
  const [description, setDescription] = useState<string>("");

  const color = randomColor();

  const handleUpdateStatusTask = (task: TaskInterface, statusId: number) => {
    taskUpdate(task.workspace.id, task.project.id, task.task_list_id, task.id, {
      status_id: statusId,
    }).then((updatedTask) => {
      setTask(updatedTask);
    });
  };

  const handleUpdatePriorityTask = (task: TaskInterface, priority: number) => {
    taskUpdate(task.workspace.id, task.project.id, task.task_list_id, task.id, {
      priority,
    }).then((updatedTask) => {
      setTask(updatedTask);
    });
  };

  const handleUpdateDescriptionTask = (task: TaskInterface) => {
    taskUpdate(task.workspace.id, task.project.id, task.task_list_id, task.id, {
      description,
    }).then((updatedTask) => {
      setTask(updatedTask);
    });
  };

  useEffect(
    () => {
      taskShow(
        Number(params.id),
        Number(params.project_id),
        Number(params.list_id),
        Number(params.task_id)
      ).then((value) => {
        setTask(value);
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [taskShow, setTask]
  );

  useEffect(() => {
    if (!task) return;
    setDescription(task.description!);
  }, [task]);

  if (!user) return <Loading />;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-shark-900">
      <header className="h-14 w-full bg-shark-800 flex items-center justify-center">
        <nav className="flex justify-between items-center w-full px-4">
          <Corelab className="fill-white" height={18} />
          <div className="flex gap-4 items-center">
            <div className="max-sm:hidden">
              Olá, <span className="font-semibold">{user.name}</span>
            </div>
            <Image
              src="https://api.dicebear.com/9.x/bottts/svg?seed=Felix"
              width={500}
              height={500}
              alt="Felix"
              className="w-9"
            />
          </div>
        </nav>
      </header>

      <nav className="h-16 border-b border-shark-800 flex items-center justify-between px-8">
        <div className="flex flex-row items-center gap-4">
          <div>
            <span
              className={`mr-2 border  text-white px-2.5 py-1 rounded-md font-bold text-sm`}
              style={{
                backgroundColor: color,
                border: color,
              }}
            >
              {handleGetFirstChar(task?.project.name!)}
            </span>
            <span>{task?.project.name}</span>
          </div>
          <span className="text-sm text-shark-400">/</span>
          <span className="flex items-center">
            <List className="w-4 h-4 opacity-50 mr-2" />
            {task?.task_list_name}
          </span>
        </div>
      </nav>

      <div className="flex flex-row flex-1 max-sm:block  overflow-auto">
        <div className="flex-1 px-8 flex flex-col grow overflow-auto pb-4">
          <Breadcrumb className="pt-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/workspace/${params.id}/project/${params.project_id}/list/${params.list_id}`}
                  className="hover:text-blue-500"
                >
                  {task?.task_list_name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-500">
                  {task?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-semibold text-2xl text-shark-200 mt-6">
            {task?.name}
          </h1>
          <div className="flex justify-between mt-6 max-sm:grid max-sm:grid-cols-1 max-sm:gap-4">
            <div className="flex gap-2 items-center text-shark-300/75">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {" "}
                  <CategoryIcon
                    width={18}
                    height={18}
                    style={{
                      fill: task?.status.color,
                    }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-shark-800 border-shark-800 text-shark-200">
                  {task?.project.statuses.map((status) => (
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
              {task?.status.name}
            </div>

            <div className="flex gap-2 items-center text-shark-300/75">
              <FlagTriangleRight className="w-5 h-5" /> Prioridade
              <div
                className={`w-fit ${
                  task?.priority === 0
                    ? "bg-blue-500"
                    : task?.priority === 1
                    ? "bg-orange-500"
                    : "bg-red-500"
                } rounded-sm flex items-center justify-center text-white `}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full px-6 py-1">
                    {getPriorityByIndex(task?.priority!)}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-shark-800 border-shark-800 text-shark-200 w-full">
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-shark-900"
                      onClick={() => handleUpdatePriorityTask(task!, 0)}
                    >
                      Baixo
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-shark-900"
                      onClick={() => handleUpdatePriorityTask(task!, 1)}
                    >
                      Médio
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-shark-900"
                      onClick={() => handleUpdatePriorityTask(task!, 2)}
                    >
                      Alto
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex gap-2 items-center text-shark-300/75">
              <Calendar className="w-5 h-5" /> Datada de entrega
            </div>

            <div className="max-sm:block sm:hidden">
              <Sheet>
                <SheetTrigger>
                  <div className="flex gap-2 items-center text-shark-300/75">
                    <MessageSquare className="w-5 h-5" /> Comentários
                  </div>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="p-0 border-none w-full h-full bg-shark-900 "
                >
                  <SheetDescription className="h-full p-0 text-white">
                    <Comments
                      id={params.id}
                      task_id={params.task_id}
                      className="max-sm:flex sm:flex w-full"
                    />
                  </SheetDescription>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <Textarea
            className="bg-shark-950 border-shark-800/90 mt-6 sm:flex-1 max-sm:h-32"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="w-full flex justify-end mt-4">
            <Button
              className="w-fit"
              onClick={() => handleUpdateDescriptionTask(task!)}
            >
              Salvar{" "}
            </Button>
          </div>
        </div>

        <Comments
          id={params.id}
          task_id={params.task_id}
          className="max-sm:hidden sm:flex"
        />
      </div>
    </div>
  );
};

export default TaskPage;
