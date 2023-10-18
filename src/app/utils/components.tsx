import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Waves } from "lucide-react";
import { FC } from "react";

type WithAlertComponentProps = {
  message: string;
  description: string;
};

export const WithAlertComponent: FC<WithAlertComponentProps> = ({
  message,
  description,
}: WithAlertComponentProps) => {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
