import { FC } from 'react';
import s from './Footer.module.scss';

const Footer: FC = () => (
  <div className={s.container}>
    <div className={s.footer}>
      <div className={s.text}>
        <p>
          中国科学技术大学开源软件镜像由{` `}
          <a href="http://ustcnet.ustc.edu.cn/">中国科学技术大学网络信息中心</a>
          {` `}
          提供支持。
        </p>
        <p>
          mirrors.ustc.edu.cn 是 Debian, Ubuntu, Fedora, Archlinux, CentOS
          等多个发行版的官方源。目前是中国大陆高校访问量最大，收录最全的开源软件镜像。
        </p>
        <p>
          <a href="https://lug.ustc.edu.cn/">中国科学技术大学 Linux 用户协会</a>
          {` `}
          是由中国科学技术大学在校的 GNU/Linux
          爱好者发起并组成的一个全校性群众团体。成立协会的目的在于联合科大的
          GNU/Linux
          使用者，搭建信息交流共享的平台，宣传自由软件的价值，提高自由软件社区文化氛围，推广自由软件在科大校园乃至合肥地区的应用。
        </p>
      </div>
      <div className={s.slogan}>
        <p>
          <span className={s.lug}>LUG</span>
          <span className={s.ustc}>{`  `}@USTC</span>
        </p>
        <p className={s.special}>&quot;life love linux&quot;</p>
      </div>
    </div>
  </div>
);

export default Footer;
