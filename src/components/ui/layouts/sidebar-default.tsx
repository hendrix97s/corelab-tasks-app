import { useAuth } from "@/contexts/use-auth";
import { useProject } from "@/contexts/use-project";
import { ProjectInterface } from "@/interfaces/project-interface";
import { memo, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ProjectFormCreate from "../project/project-form-create";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import { handleGetFirstChar, randomColor } from "@/lib/utils";
import ListFormCreate from "../list/list-form-create";
import { List, LogOut } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";

interface SidebarDefaultProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarDefault = ({ ...rest }: SidebarDefaultProps) => {
  const { user, logout } = useAuth();
  const { projectIndex } = useProject();
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    if (!user) return;
    projectIndex(user.workspace.id).then((response) => {
      setProjects(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectIndex]);

  return (
    <div
      {...rest}
      className={twMerge(
        "flex flex-col h-full bg-shark-900 w-72 border-r border-shark-800 text-shark-100",
        rest.className
      )}
    >
      <div className="flex items-center w-full h-16 font-semibold border-b border-shark-800 px-4 ">
        <span className="mr-2 bg-electric-violet-700 px-2 py-1 rounded-md font-bold text-sm ">
          W
        </span>
        {user.workspace.name}
      </div>
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center h-12 px-4">
          <h2 className="opacity-50 text-sm font-semibold">Projetos</h2>
          <ProjectFormCreate setProjects={setProjects} />
        </div>
        <div className="w-full flex-1 overflow-auto pb-4">
          <Accordion
            type="multiple"
            className="px-2 divide-y divide-shark-800/15"
          >
            {projects.map((project) => (
              <AccordionItem
                value={project.id.toString()}
                className="border-shark-800/15 "
                key={project.id}
              >
                <div className="flex items-center justify-between gap-2 hover:bg-shark-800 px-0 py-2 hover:px-2  rounded-md text-shark-200 relative group">
                  <div className="flex items-center gap-2">
                    <AccordionTrigger className="h-full flex justify-center bg-shark-950 rounded-sm p-0  sr-only group-hover:not-sr-only " />
                    <span
                      className={`text-white px-1.5 py-0.5 rounded-md font-bold text-xs not-sr-only group-hover:sr-only`}
                      style={{
                        backgroundColor: randomColor(),
                        border: randomColor(),
                      }}
                    >
                      {handleGetFirstChar(project.name)}
                    </span>
                    <span className="text-sm px-1.5 py-0.5">
                      {project.name}
                    </span>
                  </div>
                  <ListFormCreate
                    className="mt-1"
                    project={project}
                    setProjects={setProjects}
                  />
                </div>

                {project.lists?.length > 0 && (
                  <div className="pl-4">
                    {project.lists.map((list) => (
                      <AccordionContent
                        key={list.id}
                        className="flex flex-row gap-2 items-center py-2"
                      >
                        <List className="w-5 h-5 opacity-50" />
                        <Link
                          href={`/workspace/${user.workspace.id}/project/${project.id}/list/${list.id}`}
                          className="text-shark-200"
                        >
                          {list.name}
                        </Link>
                      </AccordionContent>
                    ))}
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="flex items-center w-full h-16 font-semibold border-t border-shark-800 px-4">
        <Button
          className="space-x-2 w-full flex justify-between"
          onClick={logout}
        >
          <span>Sair</span>
          <LogOut className="w-4 h-4 mr-2" />
        </Button>
      </div>
    </div>
  );
};

export default memo(SidebarDefault);
