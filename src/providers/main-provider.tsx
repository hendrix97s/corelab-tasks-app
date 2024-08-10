import { ReactNode } from "react";

type MainProviderProps = {
  children: ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  return <>{children}</>;
};

export default MainProvider;
