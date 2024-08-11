import { Dispatch, memo, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Button } from "./button";
import { PlusIcon } from "lucide-react";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  buttonName?: string;
  buttonPadding?: boolean;
  children: React.ReactNode;
  srOnly?: boolean;
  handleConfirm?: () => void;
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Dialog = ({
  title,
  buttonName,
  buttonPadding,
  srOnly,
  children,
  handleConfirm,
  open,
  setOpen,
  ...rest
}: DialogProps) => {
  return (
    <div {...rest} className={twMerge("", rest.className)}>
      <AlertDialog onOpenChange={setOpen} open={open}>
        <Button
          className={` flex gap-1 ${
            srOnly ? "sr-only group-hover:not-sr-only" : ""
          }
          ${buttonPadding ? "" : "h-fit p-0"} `}
          onClick={() => setOpen(true)}
        >
          <PlusIcon className="w-4 h-4" />
          {buttonName && buttonName}
        </Button>
        <AlertDialogContent className="bg-shark-900 border divide-y divide-shark-800 border-shark-900 p-0">
          <AlertDialogHeader>
            <AlertDialogTitle className="p-4 bg-shark-950 rounded-t-lg">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="p-4">
              {children}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="p-4">
            <AlertDialogCancel className="text-shark-950">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-electric-violet-500 hover:bg-electric-violet-500/75"
              onClick={handleConfirm}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default memo(Dialog);
