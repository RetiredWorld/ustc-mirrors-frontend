import { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import SearchContext from '@/context/SearchContext';
import LogoBlack from '../../public/logo-black.svg';

import s from './Header.module.scss';

const HeaderIndex: FC = () => {
  const { keyword, setKeyword } = useContext(SearchContext);
  function handleInput(e) {
    if (setKeyword) {
      if (e.target.value) {
        setKeyword(e.target.value);
      } else {
        setKeyword(null);
      }
    }
  }
  return (
    <div className={s.indexContainer}>
      <Link href="/" passHref>
        <div className={s.index}>
          <div className={s.indexIcon}>
            <LogoBlack />
          </div>
          <div className={s.indexInfo}>
            <h2 className={s.indexTitle}>科大镜像</h2>
            <h2 className={s.indexTitleMobile}>文件列表</h2>
            <div className={s.indexDes}>mirrors.ustc.edu.cn</div>
          </div>
          <div className={s.indexSearch}>
            <input
              id="idx-search"
              onChange={handleInput}
              value={keyword || ``}
            />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HeaderIndex;
