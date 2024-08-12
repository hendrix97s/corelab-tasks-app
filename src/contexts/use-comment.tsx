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
import { CommentInterface } from "@/interfaces/comment-interface";

interface CommentContextProps {
  commentStore: (
    workspaceId: number,
    taskId: number,
    payload: { content: string }
  ) => Promise<CommentInterface>;
  commentIndex: (
    workspaceId: number,
    taskId: number
  ) => Promise<CommentInterface[]>;
}

type CommentProps = {
  children: ReactNode;
};

const CommentContext = createContext({} as CommentContextProps);

const CommentProvider = ({ children }: CommentProps) => {
  const [loading, setLoading] = useState(false);

  const commentIndex = useCallback(
    async (workspaceId: number, taskId: number) => {
      try {
        const response = await axios.get(
          `api/workspace/${workspaceId}/task/${taskId}/comment`
        );

        return response.data;
      } catch (error) {
        toast("Falha ao buscar comentários");
      }
    },
    []
  );

  const commentStore = useCallback(
    async (
      workspaceId: number,
      taskId: number,
      payload: { content: string }
    ) => {
      try {
        const response = await axios.post(
          `api/workspace/${workspaceId}/task/${taskId}/comment`,
          payload
        );

        return response.data;
      } catch (error) {
        toast("Falha ao enviar comentário.");
      } finally {
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
    commentStore,
    commentIndex,
  };

  return (
    <CommentContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </CommentContext.Provider>
  );
};

const useComment = () => {
  const context = useContext(CommentContext);
  if (!context)
    throw new Error("useComment must be used within an HelpContext");
  return context;
};

export { useComment, CommentProvider };
