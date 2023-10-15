"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  content: string;
  kind: "QUESTION" | "ANSWER";
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: Date.now(), content: "Sample question", kind: "QUESTION" },
    { id: Date.now(), content: "Sample Answer", kind: "ANSWER" },
  ]);

  const [question, setQuestion] = useState<string>("");
  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };
  const onSubmit = async () => {
    setMessages((oldMessages) => [
      ...oldMessages,
      { id: Date.now(), content: question, kind: "QUESTION" },
    ]);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        message: question,
      }),
    });

    const { message: answer } = await response.json();
    setMessages((oldMessages) => [
      ...oldMessages,
      { id: Date.now(), content: answer, kind: "ANSWER" },
    ]);

    console.log(answer);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 gap-2">
      <div className="flex flex-grow  flex-col border-zinc border-2 rounded p-10">
        {messages.map((message) => (
          <div
            className={cn("flex", { "justify-end": message.kind === "ANSWER" })}
            key={message.id}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input type="text" value={question} onChange={onInput} />
        <Button variant="outline" className="px-8" onClick={onSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
}
