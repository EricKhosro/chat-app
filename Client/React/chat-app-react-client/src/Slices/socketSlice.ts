import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ConnectionSlice {
  socket: WebSocket | null;
}

const initialState: ConnectionSlice = {
  socket: null,
};

export const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<WebSocket | null>) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = connectionSlice.actions;

export default connectionSlice.reducer;
