import { FC } from 'react';

import s from './Main.module.scss';

const Main: FC = ({ children }) => (
  <main className={s.main}>
    <div className={s.mainSide}>{children}</div>
  </main>
);

export default Main;
