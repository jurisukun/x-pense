import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function AddCategorySubcategory({
  datafield,
}: {
  datafield: "category" | "subcategory";
}) {
  const router = useRouter();

  async function saveCategory() {
    try {
      const response = await fetch("http://localhost:3000/api/category", {
        method: "POST",
        body: JSON.stringify({ name: "New Category" }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      router.refresh();
    } catch (error) {
      throw new Error("Error");
    }
  }

  return (
    <Popover>
      <PopoverTrigger className="h-full">
        <Plus size={38} className="ml-2  rounded-sm border p-2" />
      </PopoverTrigger>
      <PopoverContent className="absolute right-[50%] w-[200px] scale-90 sm:w-[250px] sm:scale-100">
        <div className=" space-y-2">
          <h4 className="text-sm font-medium">New {datafield}</h4>
          <div>
            <Input placeholder={`${datafield} name`} />
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
