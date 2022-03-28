import { FC } from 'react';
import s from './Footer.module.scss';
import { footerConfig, metaConfig } from '@/config';

const Footer: FC = () => (
  <div className={s.container}>
    <div className={s.footer}>
      <div
        className={s.text}
        dangerouslySetInnerHTML={{ __html: footerConfig.text }}
      />
      <div className={s.slogan}>
        <p>
          <span className={s.lug}>{metaConfig.logo.large}</span>
          <span className={s.ustc}>
            {`  `}@{metaConfig.logo.small}
          </span>
        </p>
        <p className={s.special}>&quot;{metaConfig.logo.special}&quot;</p>
      </div>
    </div>
  </div>
);

export default Footer;
