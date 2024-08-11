"use client";

import Loading from "@/components/ui/loading";
import { toast } from "sonner";
import axios from "@/lib/axios";
import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { TaskListInterface } from "@/interfaces/task-list-interface";
import { taskListStoreSchemaFormProps } from "@/validations/task-list-validate";

interface TaskListContextProps {
  taskListIndex: (
    workspaceId: number,
    projectId: number
  ) => Promise<TaskListInterface[]>;

  taskListStore: (
    workspaceId: number,
    projectId: number,
    payload: taskListStoreSchemaFormProps
  ) => Promise<TaskListInterface>;

  taskListUpdate: (
    workspaceId: number,
    projectId: number,
    id: number,
    payload: taskListStoreSchemaFormProps
  ) => Promise<TaskListInterface>;

  taskListShow: (
    workspaceId: number,
    projectId: number,
    id: number
  ) => Promise<TaskListInterface>;

  taskListDestroy: (
    workspaceId: number,
    projectId: number,
    id: number
  ) => Promise<boolean>;
}

type TaskListProps = {
  children: ReactNode;
};

const TaskListContext = createContext({} as TaskListContextProps);

const TaskListProvider = ({ children }: TaskListProps) => {
  const [loading, setLoading] = useState(false);

  const taskListIndex = useCallback(
    async (workspaceId: number, projectId: number) => {
      try {
        const response = await axios.get(
          `api/workspace/${workspaceId}/project/${projectId}/task-list`
        );
        return response.data;
      } catch (error) {
        toast("Falha ao buscar listas");
      }
    },
    []
  );

  const taskListStore = useCallback(
    async (
      workspaceId: number,
      projectId: number,
      payload: taskListStoreSchemaFormProps
    ) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `api/workspace/${workspaceId}/project/${projectId}/task-list`,
          payload
        );

        toast("Lista cadastrada com sucesso.");

        return response.data;
      } catch (error) {
        toast("Falha ao cadastrar lista");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const taskListUpdate = useCallback(
    async (
      workspaceId: number,
      projectId: number,
      id: number,
      payload: taskListStoreSchemaFormProps
    ) => {
      try {
        setLoading(true);
        const response = await axios.put(
          `api/workspace/${workspaceId}/project/${projectId}/task-list${id}`,
          payload
        );

        toast("Lista atualizada com sucesso.");

        return response.data;
      } catch (error) {
        toast("Falha ao atualizar lista");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const taskListShow = useCallback(
    async (workspaceId: number, projectId: number, id: number) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `api/workspace/${workspaceId}/project/${projectId}/task-list/${id}`
        );

        return response.data;
      } catch (error) {
        toast("falha");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const taskListDestroy = useCallback(
    async (workspaceId: number, projectId: number, id: number) => {
      try {
        setLoading(true);
        const response = await axios.delete(
          `api/workspace/${workspaceId}/project/${projectId}/task-list${id}`
        );

        toast("Lista excluída com sucesso.");

        return response.data;
      } catch (error) {
        toast("Falha ao excluir lista");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const addItemOnList = useCallback(
    async (setItems: Dispatch<any>, newItem: any) => {
      setItems((prev: any | undefined) => {
        if (!prev) return prev;
        return { ...prev, data: [...prev.data, newItem] };
      });
    },
    []
  );

  const removeItemOnList = useCallback(
    async (setItems: Dispatch<any>, uuid: string) => {
      setItems((prev: any | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.filter((item: any) => item.uuid != uuid),
        };
      });
    },
    []
  );

  const values = {
    taskListIndex,
    taskListStore,
    taskListUpdate,
    taskListShow,
    taskListDestroy,
  };

  return (
    <TaskListContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </TaskListContext.Provider>
  );
};

const useTaskList = () => {
  const context = useContext(TaskListContext);
  if (!context)
    throw new Error("useTaskList must be used within an HelpContext");
  return context;
};

export { useTaskList, TaskListProvider };
