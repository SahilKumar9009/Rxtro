import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure you're using this
import rootReducer from '../reducers';  // Make sure the reducers are set correctly

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, 
  whitelist: ['userProfileReducer2', 'paramsState'],  // Whitelist the reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState = {}) {
  const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));
  const persistor = persistStore(store); // Persist store configuration
  return { store, persistor };  // Ensure you're exporting both
}
