import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useState } from "react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { userCategoryTypes } from "./expense-entry";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export default function AddCategorySubcategory({
  router,
}: {
  router: AppRouterInstance;
}) {
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(true);
  const { toast } = useToast();

  async function saveCategory() {
    try {
      const response = await fetch("api/category", {
        method: "POST",
        body: category ? JSON.stringify({ name: category }) : null,
      });

      if (!response?.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Something went wrong, try again");
      }
      setOpen(false);
      toast({
        title: "Success",
        description: "New category created",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Error creating new category",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="h-full">
        <Plus size={38} className="ml-2  rounded-sm border p-2" />
      </PopoverTrigger>
      <PopoverContent className="absolute right-[50%] w-[200px] scale-90 sm:w-[250px] sm:scale-100">
        <div className=" space-y-2">
          <h4 className="text-sm font-medium">New category</h4>
          <div>
            <Input
              placeholder={`Category name`}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={saveCategory} className="w-full bg-slate-800">
              Add
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AddSubcategory({
  router,
  underCategory,
}: {
  underCategory?: userCategoryTypes[number] | null;
  router: AppRouterInstance;
}) {
  const [subcategory, setSubCategory] = useState("");
  const [open, setOpen] = useState(true);
  const { toast } = useToast();

  async function saveSubCategory() {
    let response;
    try {
      response = await fetch("api/subcategory", {
        method: "POST",
        body: subcategory
          ? JSON.stringify({ name: subcategory, categoryId: underCategory?.id })
          : null,
      });

      if (!response?.ok) {
        let error = await response.json();
        throw new Error(error?.message || "Something went wrong");
      }
      setOpen(false);
      toast({
        title: "Success",
        description: "New subcategory created",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Error creating new subcategory",
        action: <ToastAction altText="Try again">Retry</ToastAction>,
      });
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="h-full">
        <Plus size={38} className="ml-2  rounded-sm border p-2" />
      </PopoverTrigger>
      <PopoverContent className="absolute right-[50%] w-[200px] scale-90 sm:w-[250px] sm:scale-100">
        <div className=" space-y-2">
          <h4 className="text-sm font-medium">New subcategory</h4>
          <div>
            <Input
              placeholder={`Subcategory name`}
              onChange={(e) => {
                setSubCategory(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              onClick={saveSubCategory}
              className="w-full bg-slate-800"
              disabled={!underCategory}
            >
              Add
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
