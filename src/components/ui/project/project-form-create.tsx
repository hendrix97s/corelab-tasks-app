"use client";

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import CategoryIcon from "../icons/category-icon";
import { randomColor } from "@/lib/utils";
import { ProjectInterface } from "@/interfaces/project-interface";
import { useProject } from "@/contexts/use-project";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectStoreSchema,
  projectStoreSchemaFormProps,
} from "@/validations/project-validate";
import { useAuth } from "@/contexts/use-auth";

interface ProjectFormCreateProps extends React.HTMLAttributes<HTMLDivElement> {
  setProjects: Dispatch<SetStateAction<ProjectInterface[]>>;
}

interface ModelExampleInterface {
  name: string;
  status: {
    name: string;
    color: string;
  }[];
}

const ProjectFormCreate = ({
  setProjects,
  ...rest
}: ProjectFormCreateProps) => {
  const { user } = useAuth();
  const { ProjectStore } = useProject();
  const [statusModels, setStatusModels] = useState<
    { name: string; color: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<projectStoreSchemaFormProps>({
    resolver: zodResolver(projectStoreSchema),
    defaultValues: {
      name: "",
      statuses: [],
    },
  });

  const modelExamples: ModelExampleInterface[] = [
    {
      name: "NORMAL",
      status: [
        { name: "OPEN", color: "#656F7D" },
        { name: "IN PROGRESS", color: "#F17EAD" },
        { name: "DONE", color: "#33A069" },
      ],
    },
    {
      name: "KANBAN",
      status: [
        {
          name: "OPEN",
          color: "#656F7D",
        },
        {
          name: "IN PROGRESS",
          color: "#F17EAD",
        },
        {
          name: "IN REVIEW",
          color: "#E78945",
        },
        {
          name: "DONE",
          color: "#33A069",
        },
      ],
    },
    {
      name: "SCRUM",
      status: [
        {
          name: "OPEN",
          color: "#656F7D",
        },
        {
          name: "PENDING",
          color: "#F9BE33",
        },
        {
          name: "IN PROGRESS",
          color: "#F17EAD",
        },
        {
          name: "COMPLETED",
          color: "#000000",
        },
        {
          name: "IN REVIEW",
          color: "#E78945",
        },
        {
          name: "ACCEPTED",
          color: "#DC646A",
        },
        {
          name: "REJECTED",
          color: "#C580E6",
        },
        {
          name: "BLOCKED",
          color: "#7f77f1",
        },
      ],
    },
  ];

  const handelSelectExample = (name: string) => {
    const model = modelExamples.find((example) => example.name === name);
    if (model) {
      setStatusModels(model.status);
    }
  };

  const handleStoreProject = useCallback(
    async (data: projectStoreSchemaFormProps) => {
      if (!user.workspace) return;
      const response = await ProjectStore(user.workspace.id, data);
      setProjects((prev) => [...prev, response]);
    },
    [user, ProjectStore, setProjects]
  );

  useEffect(() => {
    if (!statusModels.length) return;
    setValue("statuses", statusModels);
  }, [statusModels, setValue]);

  return (
    <div {...rest} className={twMerge("", rest.className)}>
      <Dialog
        title="Criar Projeto"
        handleConfirm={handleSubmit(handleStoreProject)}
      >
        <Label className="space-y-1.5">
          <span>Nome do projeto</span>
          <Input
            {...register("name")}
            className="bg-shark-800 border-shark-700 w-full "
            autoFocus
          />
        </Label>

        <div className="flex gap-4 mt-4 pt-4 border-t border-shark-800">
          <Label className="space-y-1.5">
            <span>Modelo de status</span>
            <Select onValueChange={handelSelectExample}>
              <SelectTrigger className="w-[180px] bg-shark-800 text-shark-300 border-shark-700 focus:ring-0">
                <SelectValue placeholder="Selecione.." />
              </SelectTrigger>
              <SelectContent className="bg-shark-950 border-shark-950">
                <SelectGroup className="text-shark-300">
                  {modelExamples.map((example, index) => (
                    <SelectItem key={index} value={example.name}>
                      {example.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>

          <div className="w-full">
            <h1>Status</h1>
            <div className="w-full flex flex-col gap-2">
              {statusModels.map((status, index) => (
                <Label key={index} className="relative space-y-1.5">
                  <Input
                    className="h-8 pl-12 bg-shark-800 border-shark-700"
                    value={status.name}
                  />
                  <CategoryIcon
                    width={18}
                    height={18}
                    className="fill-white absolute top-0 left-2"
                    style={{
                      fill: status.color,
                    }}
                  />
                </Label>
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default memo(ProjectFormCreate);
