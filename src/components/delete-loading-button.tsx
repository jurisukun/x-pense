import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonProps } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import LoadingButton from "./loading-button";

type DeleteLoadingButtonProps = ButtonProps & {
  deletefunction: () => Promise<void>;
};

export default function DeleteLoadingButton({
  children,
  deletefunction,
  ...props
}: DeleteLoadingButtonProps) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button {...props} disabled={openDialog}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[75%] max-w-[500px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Delete entry</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this entry?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <LoadingButton
            loading={open}
            onClick={() => {
              setOpen(true);
              deletefunction().then(() => {
                setOpen(false);
                setOpenDialog(false);
              });
            }}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
