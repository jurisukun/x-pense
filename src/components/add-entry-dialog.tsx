import {
  ExpenseSchemaType,
  expenseSchema,
} from "@/lib/validation/expenseSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerForm } from "./datepicker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";

import LoadingButton from "./loading-button";
import { useRouter } from "next/navigation";
import { Expense } from "@prisma/client";

import DeleteLoadingButton from "./delete-loading-button";

type AddEntrDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  expenseData?: Expense;
};

const categories = [{ name: "Food" }, { name: "Transportation" }];

export default function AddEntryDialog({
  open,
  setOpen,
  expenseData,
}: AddEntrDialogProps) {
  const router = useRouter();
  const form = useForm<ExpenseSchemaType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      item: expenseData?.item ?? "",
      note: expenseData?.note ?? "",
      amount: expenseData?.amount ?? undefined,
      category: expenseData?.category ?? "",
      subCategory: expenseData?.subCategory ?? "",
      date: expenseData?.date ?? new Date(),
    },
  });

  async function onSubmit(input: ExpenseSchemaType) {
    try {
      const response = await fetch("/api/expenses", {
        method: expenseData ? "PUT" : "POST",
        body: expenseData
          ? JSON.stringify({ ...input, id: expenseData.id })
          : JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      expenseData ? null : form.reset();
      router.refresh();
      setOpen(false);
    } catch (error) {
      alert("Error: " + error);
    }
  }

  async function onDelete({ id }: { id: string }) {
    const response = await fetch(`/api/expenses/`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    router.refresh();
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[max(300px,45%)] scale-90 rounded-md  sm:scale-100">
          <DialogHeader>
            <DialogTitle>
              {expenseData ? "Edit Entry" : "New Entry"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                name="item"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Item </FormLabel>
                      <FormControl>
                        <Input placeholder="Item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Amount </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          {...field}
                          onChange={(e) => {
                            if (e.target.value && !isNaN(+e.target.value)) {
                              field.onChange(+e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="note"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Note </FormLabel>
                      <FormControl>
                        <Textarea
                          className="line-clamp-4 resize-none"
                          placeholder="Describe this entry"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                name="category"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Category </FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(e) => {
                            console.log(e);
                            field.onChange(e);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category, key) => {
                              return (
                                <SelectItem key={key} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="subCategory"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Subcategory </FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(e) => {
                            field.onChange(e);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subcategory (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category, key) => {
                              return (
                                <SelectItem key={key} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <DatePickerForm form={form} />
              <DialogFooter className="flex items-center">
                <div className="flex w-full justify-end gap-5">
                  {expenseData && (
                    <DeleteLoadingButton
                      deletefunction={() => onDelete({ id: expenseData?.id })}
                      type="button"
                      variant={"outline"}
                      className="border-red-500 text-red-500 hover:bg-red-400 hover:text-white"
                    >
                      Delete
                    </DeleteLoadingButton>
                  )}
                  <LoadingButton
                    className=" hover:bg-slate-700"
                    type="submit"
                    loading={form.formState.isSubmitting}
                  >
                    {expenseData ? "Save Changes" : "Submit"}
                  </LoadingButton>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
