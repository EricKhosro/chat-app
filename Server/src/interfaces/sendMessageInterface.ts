import { IResponse } from "./interfaces";

export interface SendMessageDTO {
  receiversIDs: Array<string | null>;
  message: string;
}

export interface ISendMessageResponse extends IResponse {
  message: string;
  senderName: string;
}
