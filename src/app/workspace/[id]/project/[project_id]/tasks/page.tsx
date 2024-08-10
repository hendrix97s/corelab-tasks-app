"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CategoryIcon from "@/components/ui/icons/category-icon";
import { Input } from "@/components/ui/input";
import LayoutDefault from "@/components/ui/layouts/layout-default";
import ListFormCreate from "@/components/ui/list/list-form-create";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaksHeader from "@/components/ui/task/taks-header";
import { handleGetFirstChar, randomColor } from "@/lib/utils";
import { ChevronDown, PlusIcon } from "lucide-react";
import Image from "next/image";

type TasksPageProps = {
  params: {
    project_id: string;
  };
};

const TasksPage = ({ params }: TasksPageProps) => {
  const list = [
    {
      id: 1,
      name: "Nome da tarefa",
      responsible: "Luiz",
      priority: "low",
    },
    { id: 2, name: "Nome da tarefa", responsible: "Carlos", priority: "low" },
    {
      id: 3,
      name: "Nome da tarefa",
      responsible: "Jéssica",
      priority: "low",
    },
    {
      id: 4,
      name: "Nome da tarefa",
      responsible: "Antonio",
      priority: "low",
    },
  ];

  return (
    <LayoutDefault>
      <TaksHeader />

      <Accordion
        type="single"
        collapsible
        defaultValue="in-review"
        className="p-8"
      >
        <AccordionItem value={"in-review"} className="border-shark-800/15">
          <div className="flex items-center gap-2">
            <AccordionTrigger className="w-4 h-4 bg-shark-800 rounded-sm py-0" />

            <div className="bg-orange-400/75 w-fit py-1.5 px-2 rounded-lg flex items-center gap-2">
              <CategoryIcon width={18} height={18} className="fill-white" />
              <span className="font-semibold text-xs">IN REVIEW</span>
            </div>

            <ListFormCreate />
          </div>
          <AccordionContent className="flex flex-row gap-2 items-center">
            <Table className="mt-2">
              <TableHeader className="divide-shark-900 border-shark-900">
                <TableRow className="hover:bg-shark-950  divide-shark-800 border-shark-800 ">
                  <TableHead className=" text-shark-400 pl-1">Nome</TableHead>
                  <TableHead className="text-shark-400">Responsável</TableHead>
                  <TableHead className="text-shark-400">
                    Data de vencimento
                  </TableHead>
                  <TableHead className="text-right text-shark-400">
                    Prioridade
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-shark-900 text-shark-400">
                {list.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-shark-900/50 border-shark-900 "
                  >
                    <TableCell className="py-1 pl-8">
                      <div className="flex items-center gap-2">
                        <CategoryIcon
                          width={18}
                          height={18}
                          className="fill-orange-400/75"
                        />
                        <span className="text-shark-200 font-semibold">
                          {item.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-1">
                      <Image
                        src={`https://api.dicebear.com/9.x/bottts/svg?seed=${item.responsible}`}
                        width={500}
                        height={500}
                        alt="Felix"
                        className="w-8"
                      />
                    </TableCell>
                    <TableCell className="py-1">x</TableCell>
                    <TableCell className="text-right py-1">
                      {item.priority}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="col-span-4 hover:bg-shark-950 ">
                  <TableCell className="py-4 text-left col-span-4">
                    <Button
                      variant="ghost"
                      className="h-fit p-0  text-shark-400 flex gap-2 items-center ml-4 hover:bg-shark-950 hover:text-shark-400"
                    >
                      <PlusIcon className="w-5 h-5 text-shark-400" />
                      <span>Adicionar Tarefa</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </LayoutDefault>
  );
};

export default TasksPage;
