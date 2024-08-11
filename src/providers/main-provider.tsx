import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/use-auth";
import { ProjectProvider } from "@/contexts/use-project";
import { ReactNode } from "react";

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <AuthProvider>
      <ProjectProvider>
        {children}
        <Toaster />
      </ProjectProvider>
    </AuthProvider>
  );
};

export default MainProvider;
