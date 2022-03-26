import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IISOUrl {
  name: string;
  url: string;
}

export interface IISO {
  distro: string;
  urls: IISOUrl[];
}

export interface IISOInfo {
  isPop: boolean;
  iso: IISO[];
}

const initialState: IISOInfo = {
  isPop: false,
  iso: [],
};

export const isoSlice = createSlice({
  name: `iso`,
  initialState,
  reducers: {
    changeISODisplay(state, action: PayloadAction<boolean>) {
      if (document) {
        if (state.isPop) {
          document.getElementsByTagName(`html`)[0].style.overflowY = `hidden`;
        } else {
          document.getElementsByTagName(`html`)[0].style.overflowY = `auto`;
        }
      }
      state.isPop = action.payload;
    },
    updateISOList(state, action: PayloadAction<IISO[]>) {
      state.iso = action.payload;
    },
  },
});

export const { changeISODisplay, updateISOList } = isoSlice.actions;
export default isoSlice.reducer;
