import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Paper } from "../types";

type DeletePaperDialogProps = {
  paper: Paper | null;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  trigger?: ReactNode;
};

const DeletePaperDialog = ({
  paper,
  isOpen,
  onOpenChange,
  onConfirm,
  isSubmitting = false,
  trigger,
}: DeletePaperDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete paper?</DialogTitle>
          <DialogDescription>
            You are about to delete{" "}
            <span className="font-medium text-slate-900">
              {paper?.title ?? "this paper"}
            </span>
            . This action cannot be undone. Do you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end sm:flex-row-reverse gap-3">
          <Button
            variant="destructive"
            className="rounded-full px-6 text-sm"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-gray-200 text-sm text-gray-700 transition hover:text-[#B52221]"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePaperDialog;

