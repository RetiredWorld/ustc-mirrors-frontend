import { createContext, Dispatch, SetStateAction } from 'react';

export type Filter = {
  keyword: string;
  filter?: string;
};

export interface ISearchContext {
  type: 'mirror' | 'folder';
  filter: Filter;
  setFilter?: Dispatch<SetStateAction<Filter>>;
}

export const initSearchContext: ISearchContext = {
  type: `mirror`,
  filter: {
    keyword: ``,
  },
};

const SearchContext = createContext<ISearchContext>(initSearchContext);

export default SearchContext;
