import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ServerStatusInterface {
  isServerOnline: boolean;
}

const initialState: ServerStatusInterface = {
  isServerOnline: false,
};

export const serverStatusSlice = createSlice({
  name: "serverStatus",
  initialState,
  reducers: {
    setServerInfo: (state, action: PayloadAction<ServerStatusInterface>) => {
      state.isServerOnline = action.payload.isServerOnline;
    },
  },
});

export const { setServerInfo } = serverStatusSlice.actions;
export default serverStatusSlice.reducer;
