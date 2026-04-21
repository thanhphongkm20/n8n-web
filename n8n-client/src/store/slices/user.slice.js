import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoadingUser: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload ?? {};
      if (!action.payload) {
        localStorage.removeItem("access_token");
        state.user = null;
      } else {
        state.user = user ?? state.user;
        token && localStorage.setItem("access_token", token);
      }
      state.isLoadingUser = false;
    },
    updateUser: (state, action) => {
      if (state.user && action.payload) {
        const { email_address } = action.payload;

        state.user = {
          ...state.user,
          ...action.payload,
          email: email_address || state.user.email,
        };
      }
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
