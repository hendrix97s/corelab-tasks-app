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
  ProjectIndex: (workspaceId: number) => Promise<ProjectInterface[]>;
  ProjectStore: (
    workspaceId: number,
    payload: projectStoreSchemaFormProps
  ) => Promise<ProjectInterface>;
}

type ProjectProps = {
  children: ReactNode;
};

const ProjectContext = createContext({} as ProjectContextProps);

const ProjectProvider = ({ children }: ProjectProps) => {
  const [loading, setLoading] = useState(false);

  const ProjectIndex = useCallback(async (workspaceId: number) => {
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

  const ProjectStore = useCallback(
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

  const ProjectUpdate = useCallback(async (uuid: string, payload: any) => {
    try {
      setLoading(true);
      const response = await axios.post(`${uuid}`, payload);

      toast("sucesso");

      return response.data;
    } catch (error) {
      toast("falha");
    } finally {
      setLoading(false);
    }
  }, []);

  const ProjectShow = useCallback(async (uuid: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${uuid}`);

      toast("sucesso");

      return response.data;
    } catch (error) {
      toast("falha");
    } finally {
      setLoading(false);
    }
  }, []);

  const ProjectDestroy = useCallback(async (uuid: string) => {
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
    ProjectIndex,
    ProjectStore,
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
