import { createContext, Dispatch, SetStateAction } from 'react';

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

interface IISOContext {
  ISO: IISOInfo;
  setISO?: Dispatch<SetStateAction<IISOInfo>>;
}

export const initISOContext: IISOInfo = {
  isPop: false,
  iso: [],
};

const IndexListContext = createContext<IISOContext>({ ISO: initISOContext });

export default IndexListContext;
