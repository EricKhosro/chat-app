export interface SendMessageDTO {
  receiversIDs: Array<string | null>;
  message: string;
  senderName: string;
}
