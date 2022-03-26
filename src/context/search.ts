import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Order = 'name' | 'size' | 'date' | '-name' | '-size' | '-date';

export type ISearch = {
  keyword: string;
  order?: Order;
};

const initialState: ISearch = {
  keyword: ``,
  order: `name`,
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
      state.order = action.payload;
    },
  },
});

export const { clearKeyword, setKeyword, setOrder } = searchSlice.actions;

export default searchSlice.reducer;
