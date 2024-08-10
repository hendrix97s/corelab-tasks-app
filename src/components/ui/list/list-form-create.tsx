import { memo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Input } from "../input";
import { Label } from "../label";
import Dialog from "../dialog";

interface ListFormCreateProps extends React.HTMLAttributes<HTMLDivElement> {}

const ListFormCreate = ({ ...rest }: ListFormCreateProps) => {
  return (
    <div {...rest} className={twMerge("", rest.className)}>
      <Dialog title="Criar Lista" srOnly={true}>
        <Label className="space-y-1.5">
          <span>Nome da lista</span>
          <Input className="bg-shark-800 border-shark-900 w-full " autoFocus />
        </Label>
      </Dialog>
    </div>
  );
};

export default memo(ListFormCreate);
