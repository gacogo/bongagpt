type MessageContent = string;
type MessageKind = 'QUESTION' | 'ANSWER' | 'EXCEPTION';
type MessageKey = string;

type Message = {
  id: MessageKey;
  content: MessageContent;
  kind: MessageKind;
};

type MessageThread = {
  question: Message;
  answers?: Message[];
};
