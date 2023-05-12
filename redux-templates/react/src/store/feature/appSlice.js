import { createSlice } from '@reduxjs/toolkit';

// 初始化状态
const initialState = {
  count: 0,
};
// 创建一个Slice切片
export const appSlice = createSlice({
  name: 'app',
  // `createSlice` 将从 `initialState` 参数推断状态类型
  initialState,
  // 定义reducer并添加操作
  reducers: {
    incremented: (state) => {
      state.count += 1;
    },
    // payload是传递过来的参数
    decremented: (state, action) => {
      state.count -= action.payload;
    },
  },
});
// 导出方法，对应redux的actions 通过dispatch直接调用
export const { incremented, decremented } = appSlice.actions;

// 获取数据的方法
export const selectCount = (state) => state.app.count;

// 导出reducer
export default appSlice.reducer;
