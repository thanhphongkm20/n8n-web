import { configureStore } from '@reduxjs/toolkit';

import appStateReducer from './slices/app-state.slice.js';
import userReducer from './slices/user.slice.js';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
  },
});
