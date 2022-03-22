import { createContext, Dispatch, SetStateAction } from 'react';

export type Keyword = string | null;

export interface ISearchContext {
  type: 'mirror' | 'folder';
  keyword: Keyword;
  setKeyword?: Dispatch<SetStateAction<Keyword>>;
}

export const initSearchContext: ISearchContext = {
  type: `mirror`,
  keyword: ``,
};

const SearchContext = createContext<ISearchContext>(initSearchContext);

export default SearchContext;
