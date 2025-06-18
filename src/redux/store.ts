
import globalReducer from './slices/globalSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import roleReducer from './slices/roleSlice';
import categoryReducer from './slices/categorySlice';
import permissionReducer from './slices/permissionSlice';
import productReducer from './slices/productSlice';
import skuReducer from './slices/skuSlice';
import cartReducer from './slices/cartSlice';
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';




// Cấu hình persist
const authPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Chỉ persist reducer account (nơi lưu thông tin auth)
};
const categoryPersistConfig = {
  key: 'category',
  storage,
  whitelist: ['isEdit'], // Chỉ lưu trạng thái isEdit
};


const rootReducer = combineReducers({
    global: globalReducer,
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    permission: permissionReducer,
    category: persistReducer(categoryPersistConfig, categoryReducer),
    product: productReducer,
    sku: skuReducer, // Thêm reducer sk
    cart: cartReducer,
    
  
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);

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