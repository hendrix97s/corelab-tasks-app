import { memo } from "react";
import { twMerge } from "tailwind-merge";
import CorelabLogo from "../icons/corelab-logo";
import { Button } from "../button";
import { List, PlusIcon } from "lucide-react";
import Corelab from "../icons/corelab";
import Image from "next/image";
import { handleGetFirstChar, randomColor } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import ListFormCreate from "../list/list-form-create";
import ProjectFormCreate from "../project/project-form-create";

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
      lists: [],
    },

    {
      id: 2,
      order: 2,
      name: "Project 2",
      private: true,
      lists: [
        {
          id: 1,
          order: 1,
          name: "Lista de tarefas",
        },
        {
          id: 2,
          order: 1,
          name: "Lista de tarefas",
        },
        {
          id: 3,
          order: 1,
          name: "Lista de tarefas",
        },
      ],
    },
    {
      id: 3,
      order: 3,
      name: "Project 3",
      private: true,
      lists: [
        {
          id: 1,
          order: 1,
          name: "Lista de tarefas",
        },
      ],
    },
    {
      id: 4,
      order: 4,
      name: "Project 4",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Project 5",
      private: true,
      lists: [],
    },
    {
      id: 5,
      order: 5,
      name: "Finished",
      private: true,
      lists: [],
    },
  ];

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
              <ProjectFormCreate />
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-full flex-1 px-2 overflow-auto h-full divide-y divide-shark-800/15 border-none"
            >
              {projects.map((project) => (
                <AccordionItem
                  value={project.id.toString()}
                  className="border-shark-800/15"
                  key={project.order}
                >
                  <div className="flex items-center justify-between gap-2 hover:bg-shark-800 px-0 py-2 hover:px-2  rounded-md text-shark-200  group">
                    <div className="flex items-center gap-2">
                      <AccordionTrigger className="h-6 bg-shark-900 rounded-sm sr-only group-hover:not-sr-only p-0 " />

                      <span
                        className={`text-white px-1.5 py-0.5 rounded-md font-bold text-xs not-sr-only group-hover:sr-only`}
                        style={{
                          backgroundColor: randomColor(),
                          border: randomColor(),
                        }}
                      >
                        {handleGetFirstChar(project.name)}
                      </span>
                      <span className="text-sm">{project.name}</span>
                    </div>
                    <ListFormCreate className="mt-1" />
                  </div>

                  {project.lists?.length > 0 && (
                    <div className="pl-4">
                      {project.lists.map((list) => (
                        <AccordionContent
                          key={list.id}
                          className="flex flex-row gap-2 items-center py-2"
                        >
                          <List className="w-5 h-5 opacity-50" />
                          <span className="text-shark-200">{list.name}</span>
                        </AccordionContent>
                      ))}
                    </div>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
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
