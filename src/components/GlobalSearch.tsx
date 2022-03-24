import { FC, useCallback, useContext, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchContext from '@/context/SearchContext';
import { ISingleMirror } from '@/types/mirror';
import { IFolderItem } from '@/types/folder';
import s from './GlobalSearch.module.scss';

export function useFilterMirror(
  mirrorList: ISingleMirror[] | undefined,
): ISingleMirror[] {
  const { filter } = useContext(SearchContext);
  let filteredMirrorList: ISingleMirror[] = [];
  if (mirrorList) {
    if (filter.keyword !== ``) {
      filteredMirrorList = mirrorList.filter((mirror) =>
        mirror.cname.toLowerCase().includes(filter.keyword),
      );
    } else {
      filteredMirrorList = mirrorList;
    }
  }
  return filteredMirrorList;
}

export function useFilterFolder(
  folderList: IFolderItem[] | undefined,
): IFolderItem[] {
  const { filter } = useContext(SearchContext);
  let filteredFolderList: IFolderItem[] = [];
  if (folderList) {
    if (filter.keyword !== ``) {
      filteredFolderList = folderList.filter((folder) =>
        folder.name.toLowerCase().includes(filter.keyword),
      );
    } else {
      filteredFolderList = folderList;
    }
  }
  return filteredFolderList;
}

const GlobalSearch: FC = () => {
  const containerEle = useRef<HTMLDivElement>(null);
  const inputEle = useRef<HTMLInputElement>(null);
  const { filter, setFilter } = useContext(SearchContext);

  const handleClick = () => {
    const ele = containerEle.current;
    const input = inputEle.current;
    if (!ele?.classList.contains(s.containerActive)) {
      ele?.classList.add(s.containerActive);
      input?.focus();
      input?.select();
    }
  };

  const handleUnFocus = useCallback(() => {
    const ele = containerEle.current;
    ele?.classList.remove(s.containerActive);
  }, []);
  function handleInput(e) {
    if (setFilter) {
      if (e.target.value) {
        setFilter({
          ...filter,
          keyword: e.target.value,
        });
      } else {
        setFilter({
          ...filter,
          keyword: ``,
        });
      }
    }
  }

  useEffect(() => {
    const ele = containerEle.current;
    const input = inputEle.current;
    ele?.addEventListener(`click`, handleClick);
    input?.addEventListener(`focusout`, handleUnFocus);
    return () => {
      ele?.removeEventListener(`click`, handleClick);
      input?.removeEventListener(`focusout`, handleUnFocus);
    };
  }, []);

  return (
    <div ref={containerEle} className={s.container}>
      <div className={s.icon}>
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <div className={s.input}>
        <input
          ref={inputEle}
          type="text"
          onChange={handleInput}
          value={filter.keyword || ``}
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
