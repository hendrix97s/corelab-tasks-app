import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/use-auth";
import { ReactNode } from "react";

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
};

export default MainProvider;
