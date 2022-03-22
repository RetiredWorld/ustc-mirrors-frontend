import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import Link from 'next/link';

import Box, { IBoxColor } from '@/components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faCheck,
  faCodeBranch,
  faCompactDisc,
  faLink,
  faTimes,
  faTools,
} from '@fortawesome/free-solid-svg-icons';
import ISOContext from '@/context/ISOContext';
import s from './Side.module.scss';
import Logo from '../../../public/logo.svg';

interface IAbout {
  mobileExpand: boolean;
  setMobileExpand: Dispatch<SetStateAction<boolean>>;
}

const About: FC<IAbout> = ({ mobileExpand, setMobileExpand }) => (
  <Box BgClass="orange" cls={s.aboutUsContainer}>
    <Link href="/" passHref>
      <div className={s.about}>
        <div className={s.aboutImg}>
          <Logo />
        </div>
        <div className={s.aboutInfo}>
          <div className={s.aboutTitle}>科大镜像</div>
          <div className={s.aboutText}>mirrors.ustc.edu.cn</div>
        </div>
        <div
          className={s.mobileAddon}
          onClick={() => {
            setMobileExpand(!mobileExpand);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </Link>
    <div className={s.aboutUs}>
      <p className={s.name}>
        <span className={s.lug}>LUG</span>
        <span className={s.ustc}>{`  `}@USTC</span>
      </p>
      <p className={s.special}>life love linux</p>
    </div>
  </Box>
);

interface IListItem {
  name: string;
  link: string;
}

interface IListSide {
  title: string;
  icon?: IconProp;
  items: IListItem[];
  initClose?: boolean;
}

const ListSide: FC<IListSide> = ({ title, items, icon, initClose }) => {
  const [isClose, setIsClose] = useState<boolean>(!!initClose);
  const lsItems = items.map((item) => (
    <div key={item.name} className={s.listItem}>
      <a href={item.link}>{item.name}</a>
    </div>
  ));
  function toggleClose() {
    setIsClose(!isClose);
  }
  return (
    <Box>
      <div className={`${s.list}`}>
        <div
          className={`${s.listClose} ${isClose ? s.close : ``}`}
          onClick={() => {
            toggleClose();
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <h2
          className={s.listTitle}
          onClick={() => {
            toggleClose();
          }}
        >
          <FontAwesomeIcon icon={icon || faCheck} />
          {title}
        </h2>
        <div className={`${s.listContainer} ${isClose ? s.close : null}`}>
          {lsItems}
        </div>
      </div>
    </Box>
  );
};

interface IIconSide {
  title: string;
  bg?: IBoxColor;
  icon: IconProp;
  des?: string;
  cls?: string;
  onClick?: (...args: any[]) => void;
}

const IconSide: FC<IIconSide> = ({ title, bg, icon, des, cls, onClick }) => (
  <Box BgClass={bg} cls={cls} onClick={onClick}>
    <div className={s.icon}>
      <div className={s.iconLarge}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={s.iconText}>
        <h2 className={s.iconTitle}>{title}</h2>
        <div className={s.iconDes}>{des}</div>
      </div>
    </div>
  </Box>
);

const MOCKNEWS: IListItem[] = [
  {
    name: `关于移除 nodesource 镜像的通知`,
    link: `aaa`,
  },
  {
    name: `Termux 镜像变更通知`,
    link: `aaa`,
  },
  {
    name: `Rsync 服务变更通知`,
    link: `aaa`,
  },
  {
    name: `更多通知..`,
    link: `aaa`,
  },
];

const MOCKDOMAINS: IListItem[] = [
  {
    name: `mirrors.ustc.edu.cn 自动解析`,
    link: `www`,
  },
  {
    name: `mirrors.ustc.edu.cn 自动解析`,
    link: `www`,
  },
];

const News: FC = () => <ListSide title="新闻通知" items={MOCKNEWS} />;
const Domains: FC = () => (
  <ListSide
    initClose
    title="域名选择"
    icon={faCodeBranch}
    items={MOCKDOMAINS}
  />
);
const Mirrors: FC = () => {
  const { ISO, setISO } = useContext(ISOContext);
  function handleClick() {
    const newISO = { ...ISO };
    newISO.isPop = true;
    if (setISO) {
      setISO(newISO);
    }
  }
  return (
    <IconSide
      title="获取镜像"
      icon={faCompactDisc}
      bg="blue"
      des="这里为您提供各大主流 Linux 发行版的安装镜像 / ISO 文件，请根据您的发行版及其详细版本进行选择"
      cls={s.flexMirrorsMobile}
      onClick={handleClick}
    />
  );
};
const Helps: FC = () => (
  <IconSide title="镜像帮助" icon={faTools} bg="green" des="查看镜像使用说明" />
);
const Links: FC = () => (
  <ListSide initClose title="常用链接" icon={faLink} items={MOCKNEWS} />
);

const Side: FC = () => {
  const [mobileExpand, setMobileExpand] = useState<boolean>(false);

  return (
    <div className={s.side}>
      <div className={s.flexAbout}>
        <About mobileExpand={mobileExpand} setMobileExpand={setMobileExpand} />
      </div>
      <div className={`${s.flexMirrors} ${mobileExpand ? s.expand : ``}`}>
        <Mirrors />
      </div>
      <div className={s.flexHelps}>
        <Helps />
      </div>
      <div className={`${s.flexNews} ${mobileExpand ? s.expand : ``}`}>
        <News />
      </div>
      <div className={s.flexDomains}>
        <Domains />
      </div>
      <div className={s.flexLinks}>
        <Links />
      </div>
    </div>
  );
};

export default Side;
