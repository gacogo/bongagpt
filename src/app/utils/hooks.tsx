import { useState } from "react";

let nextMessageId = 1;

const createMessage = (content: string, kind: MessageKind): Message => ({
  id: nextMessageId,
  content,
  kind,
});

const withId = <T extends Message>(value: T): T =>
  ({ ...value, id: nextMessageId++ } as T);

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
    withId(defaultQuestion),
    withId(defaultAnswer),
  ]);

  const addQuestion = (content: MessageContent) => {
    const newQuestion = createQuestion(content);
    setMessages((oldMessages) => [...oldMessages, withId(newQuestion)]);
  };

  const addAnswer = (content: MessageContent) => {
    const newAnswer = createAnswer(content);
    setMessages((oldMessages) => [...oldMessages, withId(newAnswer)]);
  };
  //todo default exception?
  const addExceptionMessage = (content: MessageContent) => {
    const newException = createExceptionMessage(content);
    setMessages((oldMessages) => [...oldMessages, withId(newException)]);
  };

  return { messages, addQuestion, addAnswer, addExceptionMessage };
};
