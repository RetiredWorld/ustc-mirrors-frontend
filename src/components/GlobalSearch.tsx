import { FC, useCallback, useContext, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchContext from '@/context/SearchContext';
import s from './GlobalSearch.module.scss';

const GlobalSearch: FC = () => {
  const containerEle = useRef<HTMLDivElement>(null);
  const inputEle = useRef<HTMLInputElement>(null);
  const { keyword, setKeyword } = useContext(SearchContext);

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
    if (setKeyword) {
      if (e.target.value) {
        setKeyword(e.target.value);
      } else {
        setKeyword(null);
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
          value={keyword || ``}
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
