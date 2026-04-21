import { createSlice } from "@reduxjs/toolkit";

export const appStateSlice = createSlice({
  name: "AppState",
  initialState: {
    appState: "",
    sidebarDisplay: false,
  },
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    setAppStateChild: (state, action) => {
      state.appStateChild = action.payload;
    },
  },
});

export const { setAppState, setAppStateChild, setIsMobile } =
  appStateSlice.actions;

export default appStateSlice.reducer;
