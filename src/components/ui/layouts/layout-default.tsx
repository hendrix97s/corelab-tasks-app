import { memo } from "react";
import { twMerge } from "tailwind-merge";
import CorelabLogo from "../icons/corelab-logo";
import { Button } from "../button";
import { PlusIcon } from "lucide-react";
import Corelab from "../icons/corelab";
import Image from "next/image";

interface LayoutDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutDefault = ({ children, ...rest }: LayoutDefaultProps) => {
  const projects = [
    {
      id: 1,
      order: 1,
      name: "Project 1",
      private: true,
    },

    {
      id: 2,
      order: 2,
      name: "Project 2",
      private: true,
    },
    {
      id: 3,
      order: 3,
      name: "Project 3",
      private: true,
    },
    {
      id: 4,
      order: 4,
      name: "Project 4",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
    },
    {
      id: 5,
      order: 5,
      name: "Finished",
      private: true,
    },
  ];

  const handleGetFirstChar = (text: string) => {
    return text ? text.charAt(0) : "";
  };

  return (
    <div
      {...rest}
      className={twMerge(
        "flex flex-col w-full h-screen overflow-hidden bg-shark-900 ",
        rest.className
      )}
    >
      <header className="h-14 w-full bg-shark-800 flex items-center justify-center">
        <nav className="flex justify-between items-center w-full px-4">
          <Corelab className="fill-white" height={24} />
          <div className="flex gap-4 items-center">
            <div>
              Olá, <span className="font-semibold">Felix</span>
            </div>
            <Image
              src="https://api.dicebear.com/9.x/bottts/svg?seed=Felix"
              width={500}
              height={500}
              alt="Felix"
              className="w-9"
            />
          </div>
        </nav>
      </header>

      <div className="flex-1 flex flex-row w-full overflow-auto">
        <nav className="flex flex-col h-full bg-shark-900 w-80 border-r border-shark-800">
          <div className="flex items-center w-full h-16 font-semibold border-b border-shark-800 px-4">
            <span className="mr-2 bg-electric-violet-700 px-2 py-1 rounded-md font-bold text-sm">
              W
            </span>
            Workspace
          </div>
          <div className="flex  flex-col flex-1 overflow-auto">
            <div className="flex justify-between items-center h-12 px-4">
              <h2 className="opacity-50 text-sm font-semibold">Projetos</h2>
              <Button variant="ghost" className="hover:bg-green-500 p-0 h-fit">
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
            <ul className="px-4 overflow-auto h-full pb-4">
              {projects.map((project) => (
                <li className="py-2" key={project.order}>
                  <span className="mr-2 border border-electric-violet-700  text-electric-violet-300 bg-electric-violet-700/15  px-2 py-1 rounded-md font-bold text-sm">
                    {handleGetFirstChar(project.name)}
                  </span>
                  {project.name}
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <main className="flex flex-col h-full w-full  bg-shark-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export default memo(LayoutDefault);
