"use client";

import LayoutDefault from "@/components/ui/layouts/layout-default";

type TasksPageProps = {
  params: {
    project_id: string;
  };
};

const TasksPage = ({ params }: TasksPageProps) => {
  return (
    <LayoutDefault>
      <div className="p-4">
        <h1 className="font-semibold text-2xl text-electric-violet-500">
          Tasks Page {params.project_id}
        </h1>
      </div>
    </LayoutDefault>
  );
};

export default TasksPage;
