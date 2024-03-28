import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice/index';
import userActivitySlice from './userActivityslice/index';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';

const persistConfig:any = {
  key: 'root',
  version: '1',
  storage,
};

const rootReducer = combineReducers({
  userReducer:userSlice, 
  userActivityReducer: userActivitySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// for unit-testing purpose
export function setupStore(preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    preloadedState,
  });
}

// Actual store used by the application
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;