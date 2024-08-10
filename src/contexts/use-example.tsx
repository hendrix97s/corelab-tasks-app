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

interface ExampleContextProps {}

type ExampleProps = {
  children: ReactNode;
};

const ExampleContext = createContext({} as ExampleContextProps);

const ExampleProvider = ({ children }: ExampleProps) => {
  const [loading, setLoading] = useState(false);

  const exampleIndex = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(``);

      toast("Sucesso");

      return response.data;
    } catch (error) {
      toast("Falha");
    } finally {
      setLoading(false);
    }
  }, []);

  const exampleStore = useCallback(async (payload: any) => {
    try {
      setLoading(true);
      const response = await axios.post(``, payload);

      toast("sucesso");

      return response.data;
    } catch (error) {
      toast("falha");
    } finally {
      setLoading(false);
    }
  }, []);

  const exampleUpdate = useCallback(async (uuid: string, payload: any) => {
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

  const exampleShow = useCallback(async (uuid: string) => {
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

  const exampleDestroy = useCallback(async (uuid: string) => {
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

  const values = {};

  return (
    <ExampleContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </ExampleContext.Provider>
  );
};

const useExample = () => {
  const context = useContext(ExampleContext);
  if (!context)
    throw new Error("useExample must be used within an HelpContext");
  return context;
};

export { useExample, ExampleProvider };
