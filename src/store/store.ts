import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import errorSlice from "./slices/errorSlice";
import locationSlice from "./slices/locationSlice";

const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      error: errorSlice.reducer,
      location: locationSlice.reducer,
    },
  
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  
  export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
