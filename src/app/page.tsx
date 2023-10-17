"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";

type MessageContent = string;

type MessageKind = "QUESTION" | "ANSWER";

type MessageKey = number;

type Message = {
  id: MessageKey;
  content: MessageContent;
  kind: MessageKind;
};

//type MessageCreator = (content: MessageContent, kind: MessageKind) => Message;
/*
const makeMessageAdder = (createMessage: MessageCreator) => (
  content: MessageContent,
  kind: MessageKind,
  messages: Message[],
): Message[] => [...messages, withId(nextMessageId++, createMessage(content, kind))];

*/
const createMessage = (
  content: MessageContent,
  kind: MessageKind
): Message => ({
  id: 0,
  content,
  kind,
});

let nextMessageId = 1;

const withId = <T extends Message>(id: MessageKey, value: T): T =>
  ({ ...value, id } as T);

const createQuestion = (content: MessageContent): Message =>
  createMessage(content, "QUESTION");

const createAnswer = (content: MessageContent): Message =>
  createMessage(content, "ANSWER");

{
}
const addQuestion = (
  content: MessageContent,
  messages: Message[]
): Message[] => {
  const newQuestion = createQuestion(content);
  return [...messages, withId(nextMessageId++, newQuestion)];
};

const addAnswer = (content: MessageContent, messages: Message[]): Message[] => {
  const newAnswer = createAnswer(content);
  return [...messages, withId(nextMessageId++, newAnswer)];
};

const updateMessage = <T extends Message>(
  message: T,
  updater: (message: T) => T
): T => {
  return updater(message);
};

const defaultQuestion = createQuestion("Questions on this side");
const defaultAnswer = createAnswer("Answers on this side");
const messages: Message[] = [];

console.log(messages);
export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    withId(nextMessageId++, defaultQuestion),
    withId(nextMessageId++, defaultAnswer),
  ]);

  const [question, setQuestion] = useState<string>("");
  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(`event is %s`, event.target.value);
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
