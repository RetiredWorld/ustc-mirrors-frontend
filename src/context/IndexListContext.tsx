import { createContext, Dispatch, SetStateAction } from 'react';
import { ISingleMirror } from '@/types/mirror';
import { IFolderItem } from '@/types/folder';

export interface IItems {
  isMirror: boolean;
  mirrors: ISingleMirror[];
  folders: IFolderItem[];
}

interface IIndexListContext {
  items: IItems;
  setItems?: Dispatch<SetStateAction<IItems>>;
}

export const initListContext: IItems = {
  isMirror: true,
  mirrors: [],
  folders: [],
};

const IndexListContext = createContext<IIndexListContext>({
  items: initListContext,
});

export default IndexListContext;
