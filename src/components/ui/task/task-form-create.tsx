import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../input";
import { Label } from "../label";
import Dialog from "../dialog";
import {
  taskStoreSchema,
  taskStoreSchemaFormProps,
} from "@/validations/task-validate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/use-auth";
import { ProjectInterface } from "@/interfaces/project-interface";
import { useTask } from "@/contexts/use-task";
import { TaskListInterface } from "@/interfaces/task-list-interface";
import { TaskInterface } from "@/interfaces/task-interface";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import CategoryIcon from "../icons/category-icon";

interface TaskFormCreateProps extends React.HTMLAttributes<HTMLDivElement> {
  taskList: TaskListInterface | undefined;
  setTasks: Dispatch<SetStateAction<TaskInterface[] | undefined>>;
  ghost?: boolean;
  statusId?: number;
}

const TaskFormCreate = ({
  taskList,
  setTasks,
  ghost,
  statusId,
  ...rest
}: TaskFormCreateProps) => {
  const { user } = useAuth();
  const { taskStore } = useTask();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<taskStoreSchemaFormProps>({
    resolver: zodResolver(taskStoreSchema),
    defaultValues: {
      name: "",
      status_id: 0,
    },
  });

  const handleStoreTask = useCallback(
    async (data: taskStoreSchemaFormProps) => {
      if (!taskList) return;
      const response = await taskStore(
        user.workspace.id,
        taskList.project.id,
        taskList.id,
        data
      );
      if (response) {
        setOpen(false);
        reset();
        setTasks((prev) => {
          if (!prev) return [response];
          return [...prev, response];
        });
      }
    },
    [user, taskStore, taskList, setTasks, reset]
  );

  useEffect(() => {
    if (!statusId) return;
    setValue("status_id", statusId);
  }, [statusId, setValue]);

  return (
    <div {...rest} className={twMerge("", rest.className)}>
      <Dialog
        ghost={ghost}
        title="Criar Tarefa"
        buttonName="Adicionar Tarefa"
        buttonPadding={true}
        open={open}
        setOpen={setOpen}
        handleConfirm={handleSubmit(handleStoreTask)}
        statusId={statusId}
      >
        <div className="flex items-end gap-4">
          <Label className="space-y-1.5 flex-1">
            <span>Nome da tarefa</span>
            <Input
              {...register("name")}
              className="bg-shark-800 border-shark-900 w-full "
              autoFocus
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </Label>
          {!statusId ? (
            <Label className="space-y-1.5">
              <span>Modelo de status</span>
              <Select
                onValueChange={(value) => setValue("status_id", Number(value))}
              >
                <SelectTrigger className="w-[180px] bg-shark-800 text-shark-300 border-shark-700 focus:ring-0">
                  <SelectValue placeholder="Selecione.." />
                </SelectTrigger>
                <SelectContent className="bg-shark-950 border-shark-950">
                  <SelectGroup className="text-shark-300">
                    {taskList?.project.statuses &&
                      taskList?.project.statuses.map((status) => (
                        <SelectItem
                          key={status.id}
                          value={status.id.toString()}
                        >
                          <div className="flex items-center gap-2">
                            <CategoryIcon
                              width={18}
                              height={18}
                              className="fill-white top-0 left-2"
                              style={{
                                fill: status.color,
                              }}
                            />
                            {status.name}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>
          ) : (
            <div className="w-fit px-4 flex gap-2 mb-2">
              <CategoryIcon
                width={18}
                height={18}
                className="fill-white top-0 left-2"
                style={{
                  fill: taskList?.project.statuses?.find(
                    (status) => status.id === statusId
                  )?.color,
                }}
              />
              {
                taskList?.project.statuses?.find(
                  (status) => status.id === statusId
                )?.name
              }
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default memo(TaskFormCreate);
