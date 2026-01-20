import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import AuthReducer from './feature/authSlice';

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Persist only auth state
};
 
const rootReducer = combineReducers({
  auth: AuthReducer,
});
 
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid serialization issues
    }),
});

// Persist Store
const persistor = persistStore(store);

// Debugging: Check Persisted State
persistor.subscribe(() => {
  AsyncStorage.getItem('persist:root').then((data) => {
  });
});

export { store, persistor };
