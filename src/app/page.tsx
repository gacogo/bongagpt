"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WithAlertComponent } from "@/app/utils/components";
import { useMessages, useLocalStorage } from "@/app/utils/hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { messages, setMessages, addQuestion, addAnswer, addExceptionMessage } =
    useMessages();

  const [localStorageMessages, setLocalStorageMessages] = useLocalStorage(
    "messages",
    [messages]
  );
  useEffect(() => {
    setLocalStorageMessages(messages);
  }, [messages]);

  useEffect(() => {
    setMessages(localStorageMessages);
  }, []);

  const [loading, setLoading] = useState<Boolean>(false);
  const [question, setQuestion] = useState<string>("");
  //const [exception, setException] = useState<string>("");

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = async () => {
    if (question.trim() !== "") {
      addQuestion(question);
      setQuestion("");

      setLoading(true);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({
            message: question,
          }),
        });

        const { message: answer } = await response.json();
        addAnswer(answer);
      } catch (error) {
        const errorMessage = String(error);
        addExceptionMessage(errorMessage);
      }
      console.log(messages);
    } else {
      addExceptionMessage("No input");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 gap-2">
      <div className="flex flex-grow flex-col border-zinc border-2 rounded p-10">
        {messages.map((message) =>
          message.kind === "EXCEPTION" ? (
            <WithAlertComponent
              message={message.content}
              description="How can I help you today"
              key={message.id}
            />
          ) : (
            <div
              className={cn("flex rounded p-2", {
                "justify-end border": message.kind === "ANSWER",
              })}
              key={message.id}
            >
              {message.content}
            </div>
          )
        )}
        {loading && <Skeleton className="h-4 rounded-full" />}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          value={question}
          onChange={onInput}
          onKeyUp={handleKeyUp}
        />
        <Button variant="outline" className="px-8" onClick={onSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
}
