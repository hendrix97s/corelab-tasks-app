import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../input";
import { Label } from "../label";
import Dialog from "../dialog";
import {
  taskListStoreSchema,
  taskListStoreSchemaFormProps,
} from "@/validations/task-list-validate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/use-auth";
import { useTaskList } from "@/contexts/use-task-list";
import { ProjectInterface } from "@/interfaces/project-interface";

interface ListFormCreateProps extends React.HTMLAttributes<HTMLDivElement> {
  project: ProjectInterface;
  setProjects: Dispatch<SetStateAction<ProjectInterface[]>>;
}

const ListFormCreate = ({
  project,
  setProjects,
  ...rest
}: ListFormCreateProps) => {
  const { user } = useAuth();
  const { taskListStore } = useTaskList();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<taskListStoreSchemaFormProps>({
    resolver: zodResolver(taskListStoreSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleStoreTaskList = useCallback(
    async (data: taskListStoreSchemaFormProps) => {
      const response = await taskListStore(user.workspace.id, project.id, data);
      if (response) {
        setOpen(false);
        reset();
        setProjects((prev) => {
          return prev.map((item) => {
            if (item.id === project.id) {
              return { ...item, lists: [...item.lists, response] };
            }
            return item;
          });
        });
      }
    },
    [user, project, taskListStore, reset, setProjects]
  );

  return (
    <div {...rest} className={twMerge("", rest.className)}>
      <Dialog
        title="Criar Lista"
        srOnly={true}
        open={open}
        setOpen={setOpen}
        handleConfirm={handleSubmit(handleStoreTaskList)}
      >
        <Label className="space-y-1.5">
          <span>Nome da lista</span>
          <Input
            {...register("name")}
            className="bg-shark-800 border-shark-900 w-full "
            autoFocus
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </Label>
      </Dialog>
    </div>
  );
};

export default memo(ListFormCreate);
