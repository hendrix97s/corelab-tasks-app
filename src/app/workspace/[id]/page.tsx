"use client";

type WorkspacePageProps = {
  params: {
    id: string;
  };
};

const WorkspacePage = ({ params }: WorkspacePageProps) => {
  return (
    <div className="bg-shark-900 h-screen">
      <h1 className="font-semibold text-2xl text-electric-violet-500">
        Workspace Page {params.id}
      </h1>
    </div>
  );
};

export default WorkspacePage;
