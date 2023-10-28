import { useState } from 'react';

const createMessage = (content: string, kind: MessageKind): Message => ({
  id: 0,
  content,
  kind,
});

const createQuestion = (content: MessageContent): Message =>
  createMessage(content, 'QUESTION');

const createAnswer = (content: MessageContent): Message =>
  createMessage(content, 'ANSWER');

const createExceptionMessage = (content: MessageContent): Message =>
  createMessage(content, 'EXCEPTION');

export const useMessages = () => {
  let messageId = 0;
  const defaultQuestion = createQuestion('Question Thread');
  const defaultAnswer = createAnswer('Answer Thread');

  const withId = <T extends Message>(value: T): T =>
    ({ ...value, id: Date.now() } as T);

  const [messages, setMessages] = useState<Message[]>([
    withId(defaultQuestion),
    withId(defaultAnswer),
  ]);

  const addMessage = (
    createMessagefunc: (content: MessageContent) => Message,
    content: MessageContent
  ) =>
    setMessages((oldMessages) => [
      ...oldMessages,
      withId(createMessagefunc(content)),
    ]);

  const addQuestion = (content: MessageContent) =>
    addMessage(createQuestion, content);

  const addAnswer = (content: MessageContent) =>
    addMessage(createAnswer, content);
  //todo default exception?
  const addExceptionMessage = (content: MessageContent) =>
    addMessage(createExceptionMessage, content);

  return {
    messages,
    addMessage,
    setMessages,
    addQuestion,
    addAnswer,
    addExceptionMessage,
    defaultQuestion,
    defaultAnswer,
  };
};

export const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedValue = window.localStorage.getItem(key);
      return savedValue ? JSON.parse(savedValue) : initialValue;
    }
    return initialValue;
  });

  const setValue = (value: any) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};
