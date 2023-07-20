import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postReducer from "./postSlicer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, postReducer);
export const store = configureStore({
  reducer: {
    postHandler: persistedReducer,
  },
});

export const persistor = persistStore(store);
