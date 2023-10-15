import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex flex-grow border-zinc border-2 m-10 p-10">
        messages
      </div>
      <Input type="text" />
    </div>
  );
}
