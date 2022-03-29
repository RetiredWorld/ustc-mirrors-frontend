import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { metaConfig } from '@/config';
import {
  IRouterPath,
  useAppDispatch,
  useAppSelector,
  useRouterPath,
} from '@/utils/hooks';
import { setKeyword } from '@/context/search';
import LogoBlack from '../../public/logo-black.svg';

import s from './Header.module.scss';

const HeaderBread: FC = () => {
  const folderPath = useRouterPath(true);

  function genFolder(folderItem: IRouterPath) {
    return (
      <span key={folderItem.path}>
        {` `}/{` `}
        <Link href={folderItem.path}>{folderItem.name}</Link>
      </span>
    );
  }
  return (
    <span className={s.bread}>
      {folderPath && folderPath.length !== 0 ? (
        <>
          <span>
            <Link href="/">Home</Link>
          </span>
          {folderPath.length <= 4 ? (
            folderPath.map(genFolder)
          ) : (
            <>
              {folderPath.slice(0, 1).map(genFolder)}
              {` `}/{` `}...
              {folderPath.slice(-3).map(genFolder)}
            </>
          )}
        </>
      ) : (
        <span>
          <Link href={metaConfig.domainLink}>{metaConfig.domain}</Link>
        </span>
      )}
    </span>
  );
};

const HeaderIndex: FC = () => {
  const keyword = useAppSelector((state) => state.search.keyword);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setKeyword(e.target.value || ``));
  }
  useEffect(() => {
    function handleKeyStroke(e: KeyboardEvent) {
      if (e.key === `S`) {
        if (e.target === document.body) {
          e.preventDefault();
        }
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }
    document.addEventListener(`keydown`, handleKeyStroke);
    return () => {
      document.removeEventListener(`keydown`, handleKeyStroke);
    };
  }, []);
  return (
    <div className={s.indexContainer}>
      <div className={s.index}>
        <div>
          <Link href={metaConfig.domainLink} passHref>
            <div className={s.indexIcon}>
              <LogoBlack />
            </div>
          </Link>
          <div className={s.indexInfo}>
            <Link href={metaConfig.domainLink} passHref>
              <h2 className={s.indexTitle}>{metaConfig.siteName}</h2>
            </Link>
            <div className={s.indexDes}>
              <HeaderBread />
            </div>
          </div>
        </div>
        <div className={s.indexSearch}>
          <input
            id="idx-search"
            ref={inputRef}
            onChange={handleInput}
            placeholder="按下 S 过滤"
            value={keyword || ``}
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeaderIndex;
