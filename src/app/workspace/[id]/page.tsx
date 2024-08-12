"use client";

import LayoutDefault from "@/components/ui/layouts/layout-default";
import Image from "next/image";

type WorkspacePageProps = {
  params: {
    id: string;
  };
};

const WorkspacePage = ({ params }: WorkspacePageProps) => {
  return (
    <LayoutDefault>
      <div className="h-full flex flex-col justify-center items-center p-36">
        <Image
          src="/to-do-list-cuate.svg"
          width={1000}
          height={1000}
          alt="is empty"
          className="w-1/2"
        />
        <h1 className="text-electric-violet-500 font-semibold text-xl">
          Crie projetos e adicione listas de tarefas
        </h1>
      </div>
    </LayoutDefault>
  );
};

export default WorkspacePage;
