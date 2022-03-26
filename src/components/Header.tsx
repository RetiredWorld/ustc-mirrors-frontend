import { ChangeEvent, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { metaConfig } from '@/config';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { setKeyword } from '@/context/search';
import LogoBlack from '../../public/logo-black.svg';

import s from './Header.module.scss';

const HeaderIndex: FC = () => {
  const keyword = useAppSelector((state) => state.search.keyword);
  const dispatch = useAppDispatch();
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      dispatch(setKeyword(e.target.value));
    } else {
      dispatch(setKeyword(``));
    }
  }
  return (
    <div className={s.indexContainer}>
      <div className={s.index}>
        <Link href="/" passHref>
          <div>
            <div className={s.indexIcon}>
              <LogoBlack />
            </div>
            <div className={s.indexInfo}>
              <h2 className={s.indexTitle}>{metaConfig.siteName}</h2>
              <h2 className={s.indexTitleMobile}>文件列表</h2>
              <div className={s.indexDes}>{metaConfig.domain}</div>
            </div>
          </div>
        </Link>
        <div className={s.indexSearch}>
          <input id="idx-search" onChange={handleInput} value={keyword || ``} />
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeaderIndex;
