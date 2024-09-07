
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import roleReducer from './slices/roleSlice';
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';




// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Chỉ persist reducer account (nơi lưu thông tin auth)
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình store với getDefaultMiddleware để bỏ qua kiểm tra serializableCheck cho redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;