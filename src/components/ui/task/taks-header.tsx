import { handleGetFirstChar, randomColor } from "@/lib/utils";
import { List } from "lucide-react";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../input";

interface TaskHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const TaskHeader = ({ ...rest }: TaskHeaderProps) => {
  return (
    <div {...rest} className={twMerge(" ", rest.className)}>
      <nav className="h-16 border-b border-shark-800 flex items-center justify-between px-4">
        <div className="flex flex-row items-center gap-4">
          <div>
            <span
              className={`mr-2 border  text-white px-2.5 py-1 rounded-md font-bold text-sm`}
              style={{
                backgroundColor: randomColor(),
                border: randomColor(),
              }}
            >
              {handleGetFirstChar("Embedder Hub")}
            </span>
            <span>Embedder hub</span>
          </div>
          <span className="text-sm text-shark-400">/</span>
          <span className="flex items-center">
            <List className="w-4 h-4 opacity-50 mr-2" />
            Tarefas
          </span>
        </div>
        <Input
          className="bg-shark-950 border-shark-900 h-8 w-fit"
          placeholder="Pesquisar tarefas..."
        />
      </nav>
    </div>
  );
};

export default memo(TaskHeader);
