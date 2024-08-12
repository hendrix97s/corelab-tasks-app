"use client";

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
import useSWR from "swr";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import { UserInterface, UsersInterface } from "@/interfaces/user-interface";
import {
  signInUserSchemaFormProps,
  storeUserSchemaFormProps,
  updateUserSchemaFormProps,
} from "@/validations/user-validate";
import { toast } from "sonner";
import { register } from "module";

type AuthContextProps = {
  user: UserInterface;
  login: (data: signInUserSchemaFormProps) => Promise<UserInterface>;
  userRegister: (data: storeUserSchemaFormProps) => Promise<UserInterface>;
  logout: () => void;
};

type AuthProviderProps = {
  children?: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: user, mutate } = useSWR("/user", async () => {
    try {
      const response = await axios.get("/api/is-logged");
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        deleteCookie(process.env.NEXT_PUBLIC_USER_PERSONAL_ACCESS_TOKEN!);
      }
    }
  });

  const login = useCallback(
    async (data: signInUserSchemaFormProps) => {
      try {
        setLoading(true);
        const response = await axios.post("/login", data);

        if (response.status !== 200) throw new Error("Falha ao efetuar login");

        setCookie(
          process.env.NEXT_PUBLIC_USER_PERSONAL_ACCESS_TOKEN!,
          response.data.token
        );

        mutate();
        return response.data;
      } catch (error: any) {
        toast("Falha ao efetuar login");
      } finally {
        setLoading(false);
      }
    },
    [mutate]
  );

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post("/logout");
      if (response.status === 200) {
        deleteCookie(process.env.NEXT_PUBLIC_USER_PERSONAL_ACCESS_TOKEN!);
        router.push("/");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [router]);

  const userRegister = useCallback(
    async (data: storeUserSchemaFormProps) => {
      try {
        setLoading(true);
        const response = await axios.post("/register", data);

        if (response.status !== 200)
          throw new Error("Falha ao registrar usuário");

        setCookie(
          process.env.NEXT_PUBLIC_USER_PERSONAL_ACCESS_TOKEN!,
          response.data.token
        );

        mutate();
        return response.data;
      } catch (error: any) {
        toast("Falha ao efetuar login");
      } finally {
        setLoading(false);
      }
    },
    [mutate]
  );

  const userStore = useCallback(
    async (companyUuid: string, payload: storeUserSchemaFormProps) => {
      try {
        const response = await axios.post(
          `api/company/${companyUuid}/user`,
          payload
        );

        toast("Usuário cadastrado com sucesso.");

        return response.data.data;
      } catch (error: any) {
        toast("Falha no cadastramento");
      }
    },
    []
  );

  const updatePassword = useCallback(
    async (
      companyUuid: string,
      uuid: string,
      data: updateUserSchemaFormProps
    ) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `/api/company/${companyUuid}/user/${uuid}/edit`,
          data
        );
        toast("Senha Atualizada com sucesso.");
        return response.data.data;
      } catch (error: any) {
        toast("Falha ao tentar atualizar a senha.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const addNewUserOnUsers = useCallback(
    async (
      setUsers: Dispatch<SetStateAction<UsersInterface | undefined>>,
      newUser: UserInterface
    ) => {
      setUsers((prev: UsersInterface | undefined) => {
        if (!prev) return prev;
        return { ...prev, data: [...prev.data, newUser] };
      });
    },
    []
  );

  const updateUserOnUsers = useCallback(
    async (
      setUsers: Dispatch<SetStateAction<UsersInterface | undefined>>,
      userUpdated: UserInterface
    ) => {
      setUsers((prev: UsersInterface | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.map((user: UserInterface) => {
            if (user.id === userUpdated.id) return userUpdated;
            return user;
          }),
        };
      });
    },
    []
  );
  const values = {
    user,
    login,
    logout,
    userRegister,
    addNewUserOnUsers,
    updateUserOnUsers,
  };

  return (
    <AuthContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
