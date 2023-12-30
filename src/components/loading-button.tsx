import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonProps } from "./ui/button";

type LoadingButtonProps = ButtonProps & {
  loading: boolean;
};

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
}
