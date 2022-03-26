import { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { setKeyword } from '@/context/search';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import s from './GlobalSearch.module.scss';

const GlobalSearch: FC = () => {
  const containerEle = useRef<HTMLDivElement>(null);
  const inputEle = useRef<HTMLInputElement>(null);
  const keyword = useAppSelector((state) => state.search.keyword);
  const dispatch = useAppDispatch();

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
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      dispatch(setKeyword(e.target.value));
    } else {
      dispatch(setKeyword(``));
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
  }, [handleUnFocus]);

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
          value={keyword || ``}
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
