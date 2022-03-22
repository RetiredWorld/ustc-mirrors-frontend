import { FC, useState } from 'react';
import ISOContext, { IISOInfo, initISOContext } from '@/context/ISOContext';
import SearchContext, {
  initSearchContext,
  Keyword,
} from '@/context/SearchContext';
import IndexListContext, { IItems, initListContext } from './IndexListContext';

const ContextWrapper: FC = ({ children }) => {
  const [items, setItems] = useState<IItems>(initListContext);
  const [ISO, setISO] = useState<IISOInfo>(initISOContext);
  const [keyword, setKeyword] = useState<Keyword>(initSearchContext.keyword);

  const setISOWithMask: typeof setISO = (iso) => {
    if (document) {
      if ((iso as IISOInfo).isPop) {
        document.getElementsByTagName(`html`)[0].style.overflowY = `hidden`;
      } else {
        document.getElementsByTagName(`html`)[0].style.overflowY = `auto`;
      }
    }
    setISO(iso);
  };

  return (
    <IndexListContext.Provider
      value={{
        items,
        setItems,
      }}
    >
      <ISOContext.Provider value={{ ISO, setISO: setISOWithMask }}>
        <SearchContext.Provider
          value={{
            type: `mirror`,
            keyword,
            setKeyword,
          }}
        >
          {children}
        </SearchContext.Provider>
      </ISOContext.Provider>
    </IndexListContext.Provider>
  );
};

export default ContextWrapper;
