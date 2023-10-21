type MessageContent = string;
type MessageKind = "QUESTION" | "ANSWER" | "EXCEPTION";
type MessageKey = number;

interface Message {
    id: MessageKey;
    content: MessageContent;
    kind: MessageKind;
  }
  