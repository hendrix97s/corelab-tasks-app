"use client";

import LayoutDefault from "@/components/ui/layouts/layout-default";

type WorkspacePageProps = {
  params: {
    id: string;
  };
};

const WorkspacePage = ({ params }: WorkspacePageProps) => {
  return (
    <LayoutDefault>
      <div className="p-4">
        <h1 className="font-semibold text-2xl text-electric-violet-500">
          Workspace Page {params.id}
        </h1>
      </div>
    </LayoutDefault>
  );
};

export default WorkspacePage;
