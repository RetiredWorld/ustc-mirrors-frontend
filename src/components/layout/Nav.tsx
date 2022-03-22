import { FC } from 'react';
import s from './Nav.module.scss';
import LogoBlack from '../../../public/logo-black.svg';

const Nav: FC = () => (
  <nav className={s.navContainer}>
    <div className={s.nav}>
      <div className={s.logo}>
        <LogoBlack />
      </div>
      <div className={s.title}>
        <h1>科大镜像</h1>
        <p>mirrors.ustc.edu.cn</p>
      </div>
    </div>
  </nav>
);

export default Nav;
