import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ServerResponse } from "../Interfaces/commonInterfaces";

interface ConnectionSlice {
  socket: WebSocket | null;
  serverResponse: ServerResponse;
  isConnected: boolean;
}

const initialState: ConnectionSlice = {
  socket: null,
  isConnected: false,
  serverResponse: {} as ServerResponse,
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<WebSocket | null>) => {
      state.socket = action.payload;
    },
    setServerResponse: (state, action: PayloadAction<ServerResponse>) => {
      state.serverResponse = action.payload;
    },
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setSocket, setServerResponse, setIsConnected } =
  connectionSlice.actions;

export default connectionSlice.reducer;
