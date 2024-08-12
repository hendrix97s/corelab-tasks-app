"use client";

import Loading from "@/components/ui/loading";
import { toast } from "sonner";
import axios from "@/lib/axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { TaskInterface } from "@/interfaces/task-interface";
import { taskStoreSchemaFormProps } from "@/validations/task-validate";
import { storeUserSchemaFormProps } from "@/validations/user-validate";

interface TaskContextProps {
  taskIndex: (
    workspaceId: number,
    projectId: number,
    taskListId: number
  ) => Promise<TaskInterface[]>;

  taskStore: (
    workspaceId: number,
    projectId: number,
    taskListId: number,
    payload: taskStoreSchemaFormProps
  ) => Promise<TaskInterface>;

  taskShow: (
    workspaceId: number,
    projectId: number,
    taskListId: number,
    id: number
  ) => Promise<TaskInterface>;

  taskUpdate: (
    workspaceId: number,
    projectId: number,
    taskListId: number,
    id: number,
    payload: any
  ) => Promise<TaskInterface>;

  addTaskOnTasks: (
    setTasks: Dispatch<SetStateAction<TaskInterface[] | undefined>>,
    newTask: TaskInterface
  ) => Promise<void>;

  removeTaskOnTasks: (setTasks: Dispatch<any>, id: number) => Promise<void>;
}

type TaskProps = {
  children: ReactNode;
};

const TaskContext = createContext({} as TaskContextProps);

const TaskProvider = ({ children }: TaskProps) => {
  const [loading, setLoading] = useState(false);

  const taskIndex = useCallback(
    async (workspaceId: number, projectId: number, taskListId: number) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `api/workspace/${workspaceId}/project/${projectId}/task-list/${taskListId}/task`
        );
        return response.data;
      } catch (error) {
        toast("Falha ao buscar Tarefas");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const taskStore = useCallback(
    async (
      workspaceId: number,
      projectId: number,
      taskListId: number,
      payload: taskStoreSchemaFormProps
    ) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `api/workspace/${workspaceId}/project/${projectId}/task-list/${taskListId}/task`,
          payload
        );

        toast("Tarefa cadastrada com sucesso.");

        return response.data;
      } catch (error) {
        toast("Falha ao cadastrar tarefa");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const taskUpdate = useCallback(
    async (
      workspaceId: number,
      projectId: number,
      taskListId: number,
      id: number,
      payload: any
    ) => {
      try {
        setLoading(true);
        const response = await axios.put(
          `api/workspace/${workspaceId}/project/${projectId}/task-list/${taskListId}/task/${id}`,
          payload
        );

        toast(`Tarefa (${response.data.name}) atualizado com sucesso.`);

        return response.data;
      } catch (error) {
        toast("Falha ao tentar atualizar tarefa");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const taskShow = useCallback(
    async (
      workspaceId: number,
      projectId: number,
      taskListId: number,
      id: number
    ) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `api/workspace/${workspaceId}/project/${projectId}/task-list/${taskListId}/task/${id}`
        );

        return response.data;
      } catch (error) {
        toast("Falha ao buscar Tarefa");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const taskDestroy = useCallback(async (uuid: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${uuid}`);

      toast("sucesso");

      return response.data;
    } catch (error) {
      toast("falha");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTaskOnTasks = useCallback(
    async (
      setTasks: Dispatch<SetStateAction<TaskInterface[] | undefined>>,
      newTask: TaskInterface
    ) => {
      setTasks((prev: TaskInterface[] | undefined) => {
        if (!prev) return prev;
        return [newTask, ...prev];
      });
    },
    []
  );

  const removeTaskOnTasks = useCallback(
    async (
      setTasks: Dispatch<SetStateAction<TaskInterface[] | undefined>>,
      id: number
    ) => {
      setTasks((prev: TaskInterface[] | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.filter((task: any) => task.id != id),
        };
      });
    },
    []
  );

  const values = {
    taskIndex,
    taskStore,
    taskShow,
    taskUpdate,
    addTaskOnTasks,
    removeTaskOnTasks,
  };

  return (
    <TaskContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within an HelpContext");
  return context;
};

export { useTask, TaskProvider };
