"use client";

import { CirclesBackground } from "@/components/CirclesBackground";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CategoryIcon from "@/components/ui/icons/category-icon";
import { Input } from "@/components/ui/input";
import LayoutDefault from "@/components/ui/layouts/layout-default";
import ListFormCreate from "@/components/ui/list/list-form-create";
import Loading from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaskHeader from "@/components/ui/task/task-header";
import Tasks from "@/components/ui/task/tasks";
import { useAuth } from "@/contexts/use-auth";
import { useProject } from "@/contexts/use-project";
import { useTask } from "@/contexts/use-task";
import { useTaskList } from "@/contexts/use-task-list";
import { TaskInterface } from "@/interfaces/task-interface";
import { TaskListInterface } from "@/interfaces/task-list-interface";
import { handleGetFirstChar, randomColor } from "@/lib/utils";
import { ChevronDown, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ListPageProps = {
  params: {
    project_id: string;
    list_id: string;
  };
};

const ListPage = ({ params }: ListPageProps) => {
  const { user } = useAuth();
  const { taskListShow } = useTaskList();
  const { taskIndex } = useTask();
  const [taskList, setTaskList] = useState<TaskListInterface>();
  const [tasks, setTasks] = useState<TaskInterface[] | undefined>([]);

  const handleGetTasksByStatusName = (statusName: string) => {
    return tasks?.filter((task) => task.status.name === statusName) ?? [];
  };

  const handleGetStatusesName = (): string[] => {
    return taskList?.project.statuses.map((status) => status.name) || [];
  };

  useEffect(() => {
    if (!user) return;
    taskListShow(
      user.workspace.id,
      Number(params.project_id),
      Number(params.list_id)
    ).then((value) => {
      setTaskList(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskListShow, user]);

  useEffect(() => {
    if (!user || !taskList) return;
    taskIndex(user.workspace.id, taskList?.project.id, taskList?.id).then(
      (value) => {
        setTasks(value);
      }
    );
  }, [user, taskList, taskIndex]);

  if (!user || !taskList) return <Loading />;
  return (
    <LayoutDefault className="relative">
      <TaskHeader taskList={taskList} setTasks={setTasks} />

      <div className="flex-1 overflow-auto">
        {tasks && tasks?.length > 0 ? (
          <Accordion
            type="multiple"
            defaultValue={handleGetStatusesName()}
            className="p-5 "
          >
            {taskList?.project.statuses &&
              taskList.project.statuses.map((status) => (
                <div
                  key={status.id}
                  className={`${
                    handleGetTasksByStatusName(status.name)?.length > 0
                      ? "mb-6"
                      : ""
                  }`}
                >
                  {handleGetTasksByStatusName(status.name)?.length > 0 && (
                    <Tasks
                      taskList={taskList}
                      statuses={taskList.project.statuses}
                      key={status.id}
                      value={status.name}
                      status={status}
                      tasks={handleGetTasksByStatusName(status.name)}
                      setTasks={setTasks}
                    />
                  )}
                </div>
              ))}
          </Accordion>
        ) : (
          <div className="h-full flex flex-col justify-center items-center ">
            <Image
              src="/empty-cuate.svg"
              width={1000}
              height={1000}
              alt="is empty"
              className="w-1/2"
            />
            <h1 className="text-electric-violet-500 font-semibold text-xl">
              Adicione uma tarefa a sua lista.
            </h1>
          </div>
        )}
      </div>
    </LayoutDefault>
  );
};

export default ListPage;
