import { ChangeEvent, FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import SearchContext from '@/context/SearchContext';
import { metaConfig } from '@/config';
import LogoBlack from '../../public/logo-black.svg';

import s from './Header.module.scss';

const HeaderIndex: FC = () => {
  const { filter, setFilter } = useContext(SearchContext);
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
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
          <input
            id="idx-search"
            onChange={handleInput}
            value={filter.keyword || ``}
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeaderIndex;
