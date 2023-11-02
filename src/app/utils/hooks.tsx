import { useState } from 'react';

const createMessage = (content: string, kind: MessageKind): Message => ({
  id: 0,
  content,
  kind,
});

const createMessageThread = (question: Message): MessageThread => ({
  question,
  answers: [],
});

const addAnswerToThread = (
  parentThread: MessageThread,
  answer: Message
): MessageThread => ({
  ...parentThread,
  answers: [...(parentThread.answers || []), answer],
});

const createQuestion = (content: MessageContent): Message =>
  createMessage(content, 'QUESTION');

const createAnswer = (content: MessageContent): Message =>
  createMessage(content, 'ANSWER');

const createExceptionMessage = (content: MessageContent): Message =>
  createMessage(content, 'EXCEPTION');

export const useMessages = () => {
  const defaultQuestion = createQuestion('Question Thread');
  const defaultAnswer = createAnswer('Answer Thread');

  const withId = <T extends Message>(value: T, id: number = Date.now()): T =>
    ({ ...value, id: id } as T);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageThreads, setMessageThreads] = useState<MessageThread[]>([]);

  const addMessageThread = (newMsgThread: MessageThread) =>
    setMessageThreads((oldThreads) => [...oldThreads, newMsgThread]);

  const addMessage = (
    createMessagefunc: (content: MessageContent) => Message,
    content: MessageContent,
    id?: number
  ) =>
    setMessages((oldMessages) => [
      ...oldMessages,
      withId(createMessagefunc(content), id),
    ]);

  const addQuestion = (content: MessageContent, id?: number) =>
    addMessage(createQuestion, content, id);

  const addAnswer = (content: MessageContent, id?: number) =>
    addMessage(createAnswer, content, id);
  //todo default exception?

  const addExceptionMessage = (content: MessageContent) =>
    addMessage(createExceptionMessage, content);

  return {
    messageThreads,
    createMessageThread,
    addAnswerToThread,
    addMessageThread,
    messages,
    addMessage,
    addQuestion,
    addAnswer,
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
