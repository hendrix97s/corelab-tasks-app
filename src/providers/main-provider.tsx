import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/use-auth";
import { ProjectProvider } from "@/contexts/use-project";
import { TaskProvider } from "@/contexts/use-task";
import { TaskListProvider } from "@/contexts/use-task-list";
import { ReactNode } from "react";

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <TaskListProvider>
          <TaskProvider>
            {children}
            <Toaster />
          </TaskProvider>
        </TaskListProvider>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default MainProvider;
