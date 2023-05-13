export interface Users {
  username: string;
  id: string;
}

export interface Message {
  senderName: string;
  recieverName?: string;
  message: string;
}
