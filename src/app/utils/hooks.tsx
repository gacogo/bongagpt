import { useState } from "react";

type MessageContent = string;
type MessageKind = "QUESTION" | "ANSWER" | "EXCEPTION";
type MessageKey = number;

type Message = {
  id: MessageKey;
  content: MessageContent;
  kind: MessageKind;
};

let nextMessageId = 1;

const createMessage = (
  content: MessageContent,
  kind: MessageKind
): Message => ({
  id: 0,
  content,
  kind,
});

const withId = <T extends Message>(id: MessageKey, value: T): T =>
  ({ ...value, id } as T);

const createQuestion = (content: MessageContent): Message =>
  createMessage(content, "QUESTION");

const createAnswer = (content: MessageContent): Message =>
  createMessage(content, "ANSWER");

const createExceptionMessage = (content: MessageContent): Message =>
  createMessage(content, "EXCEPTION");

export const useMessages = () => {
  const defaultQuestion = createQuestion("Question Thread");
  const defaultAnswer = createAnswer("Answer Thread");

  const [messages, setMessages] = useState<Message[]>([
    withId(nextMessageId++, defaultQuestion),
    withId(nextMessageId++, defaultAnswer),
  ]);

  const addQuestion = (content: MessageContent) => {
    const newQuestion = createQuestion(content);
    setMessages((oldMessages) => [
      ...oldMessages,
      withId(nextMessageId++, newQuestion),
    ]);
  };

  const addAnswer = (content: MessageContent) => {
    const newAnswer = createAnswer(content);
    setMessages((oldMessages) => [
      ...oldMessages,
      withId(nextMessageId++, newAnswer),
    ]);
  };
  //todo default exception?
  const addExceptionMessage = (content: MessageContent) => {
    const newException = createExceptionMessage(content);
    setMessages((oldMessages) => [
      ...oldMessages,
      withId(nextMessageId++, newException),
    ]);
  };

  return { messages, addQuestion, addAnswer, addExceptionMessage };
};
