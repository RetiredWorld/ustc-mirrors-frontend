import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Order {
  nameRev = -4,
  statusRev,
  dateRev,
  sizeRev,
  none,
  name,
  status,
  date,
  size,
}

export type ISearch = {
  keyword: string;
  order: Order;
};

const initialState: ISearch = {
  keyword: ``,
  order: Order.none,
};

export const searchSlice = createSlice({
  name: `search`,
  initialState,
  reducers: {
    clearKeyword(state) {
      state.keyword = ``;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setOrder(state, action: PayloadAction<Order>) {
      let order = action.payload;
      if (state.order === Order.none && order === Order.name) {
        state.order = action.payload - 5;
        return;
      }
      if (state.order === order || state.order + 5 === order) {
        if (state.order > 0) {
          order -= 5;
        }
      }
      state.order = order;
    },
  },
});

export const { clearKeyword, setKeyword, setOrder } = searchSlice.actions;

export default searchSlice.reducer;
