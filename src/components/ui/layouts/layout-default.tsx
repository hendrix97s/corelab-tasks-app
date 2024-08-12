import { memo, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import CorelabLogo from "../icons/corelab-logo";
import { Button } from "../button";
import { List, LogOut, Menu, PlusIcon } from "lucide-react";
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
import Link from "next/link";
import { CirclesBackground } from "@/components/CirclesBackground";
import { useAuth } from "@/contexts/use-auth";
import Loading from "../loading";
import { useProject } from "@/contexts/use-project";
import { ProjectInterface } from "@/interfaces/project-interface";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import SidebarDefault from "./sidebar-default";

interface LayoutDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LayoutDefault = ({ children, ...rest }: LayoutDefaultProps) => {
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

  if (!user) return <Loading />;

  return (
    <div
      {...rest}
      className={twMerge(
        "flex flex-col w-full h-screen overflow-auto bg-shark-900 ",
        rest.className
      )}
    >
      <header className="h-14 w-full bg-shark-800 flex items-center justify-center">
        <nav className="flex justify-between items-center w-full px-4 ">
          <div className="max-sm:block sm:hidden">
            <Sheet>
              <SheetTrigger>
                <Button className=" px-2 py-1 h-fit">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 border-none w-60 ">
                <SheetDescription className="h-full p-0">
                  <SidebarDefault className="w-full h-full" />
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
          <Corelab className="fill-white" height={18} />
          <div className="flex gap-4 items-center">
            <div className="max-sm:sr-only">
              Olá, <span className="font-semibold">{user.name}</span>
            </div>
            <Image
              src={`https://api.dicebear.com/9.x/bottts/svg?seed=${user.name}`}
              width={500}
              height={500}
              alt="Felix"
              className="w-9"
            />
          </div>
        </nav>
      </header>

      <div className="flex-1 flex flex-row w-full overflow-auto">
        <SidebarDefault className="max-sm:hidden sm:block" />
        <main className="flex flex-col w-full  bg-shark-950 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default memo(LayoutDefault);
