import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './feature/appSlice';
import userSlice from './feature/userSlice';
// 创建store
export const store = configureStore({
  // feature中创建多个子reducer 最终在这里进行合并
  reducer: {
    app: appReducer,
    user: userSlice,
  },
  // 中间件
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // redux-devtools-extension何时开启
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
