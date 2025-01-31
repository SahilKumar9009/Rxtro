import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "../reducers"; // Ensure this path is correct
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userProfileReducer2", "paramsState"], // Whitelist reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureAppStore(initialState = {}) {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware
  });

  const persistor = persistStore(store); // Create the persistor
  return { store, persistor }; // Return both store and persistor
}
