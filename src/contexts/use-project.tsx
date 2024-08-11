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
import { ProjectInterface } from "@/interfaces/project-interface";
import { projectStoreSchemaFormProps } from "@/validations/project-validate";

interface ProjectContextProps {
  projectIndex: (workspaceId: number) => Promise<ProjectInterface[]>;
  projectStore: (
    workspaceId: number,
    payload: projectStoreSchemaFormProps
  ) => Promise<ProjectInterface>;
  projectShow: (
    workspaceId: number,
    projectId: number
  ) => Promise<ProjectInterface>;
}

type ProjectProps = {
  children: ReactNode;
};

const ProjectContext = createContext({} as ProjectContextProps);

const ProjectProvider = ({ children }: ProjectProps) => {
  const [loading, setLoading] = useState(false);

  const projectIndex = useCallback(async (workspaceId: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`api/workspace/${workspaceId}/project`);
      return response.data;
    } catch (error) {
      toast("Falha");
    } finally {
      setLoading(false);
    }
  }, []);

  const projectStore = useCallback(
    async (workspaceId: number, payload: projectStoreSchemaFormProps) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `api/workspace/${workspaceId}/project`,
          payload
        );

        toast("Projeto cadastrado com sucesso.");

        return response.data;
      } catch (error) {
        toast("falha");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const projectUpdate = useCallback(
    async (
      workspaceId: number,
      id: number,
      payload: projectStoreSchemaFormProps
    ) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `api/workspace/${workspaceId}/project/${id}`,
          payload
        );

        toast("sucesso");

        return response.data;
      } catch (error) {
        toast("falha");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const projectShow = useCallback(async (workspaceId: number, id: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `api/workspace/${workspaceId}/project${id}`
      );
      return response.data;
    } catch (error) {
      toast("Falha ao buscar projeto");
    } finally {
      setLoading(false);
    }
  }, []);

  const projectDestroy = useCallback(async (uuid: string) => {
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
    projectIndex,
    projectStore,
    projectShow,
  };

  return (
    <ProjectContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProject must be used within an HelpContext");
  return context;
};

export { useProject, ProjectProvider };
