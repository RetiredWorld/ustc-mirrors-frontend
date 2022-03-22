import { FC } from 'react';
import s from './NavNew.module.scss';
import LogoBlack from '../../../public/logo-black.svg';

const NavNew: FC = () => (
  <div className={s.container}>
    <div className={s.logo}>
      <LogoBlack />
    </div>
    <div>
      <h1>科大镜像站</h1>
      <p>mirrors.ustc.edu.cn</p>
    </div>
  </div>
);

export default NavNew;
