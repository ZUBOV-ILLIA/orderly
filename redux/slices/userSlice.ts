import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSlice {
  id: string;
  email: string;
  avatar: string | null;
}

const initialState: UserSlice = {
  id: "",
  email: "",
  avatar: null,
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserSlice>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
