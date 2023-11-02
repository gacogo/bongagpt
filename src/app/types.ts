type MessageContent = string;
type MessageKind = 'QUESTION' | 'ANSWER' | 'EXCEPTION';
type MessageKey = number;

type Message = {
  id: MessageKey;
  content: MessageContent;
  kind: MessageKind;
};

type MessageThread = {
  question: Message;
  answers?: Message[];
};
