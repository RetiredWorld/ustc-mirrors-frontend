import { Dispatch, FC, SetStateAction, useState } from 'react';
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
import { ILink, metaConfig, sideConfig } from '@/config';
import s from './Side.module.scss';
import Logo from '../../../public/logo.svg';
import { useAppDispatch } from '@/utils/hooks';
import { changeISODisplay } from '@/context/iso';

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
          <div className={s.aboutTitle}>{metaConfig.siteName}</div>
          <div className={s.aboutText}>{metaConfig.domain}</div>
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
    <a className={s.homepageLink} href={metaConfig.homepage}>
      <div className={s.aboutUs}>
        <p className={s.name}>
          <span className={s.lug}>{metaConfig.logo.large}</span>
          <span className={s.ustc}>
            {`  `}@{metaConfig.logo.small}
          </span>
        </p>
        {metaConfig.logo.special ? (
          <p className={s.special}>{metaConfig.logo.special}</p>
        ) : null}
      </div>
    </a>
  </Box>
);

interface IListSide {
  title: string;
  icon?: IconProp;
  items: ILink[];
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
  link?: string;
  onClick?: (...args: any[]) => void;
}

const IconSide: FC<IIconSide> = ({
  title,
  bg,
  icon,
  des,
  cls,
  onClick,
  link,
}) => (
  <Box BgClass={bg} cls={cls} onClick={onClick} link={link}>
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

const MOCKNEWS: ILink[] = [
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

const News: FC = () => <ListSide title="新闻通知" items={MOCKNEWS} />;
const Domains: FC = () =>
  sideConfig.domains.enable ? (
    <ListSide
      initClose={sideConfig.domains.initClose}
      title="域名选择"
      icon={faCodeBranch}
      items={sideConfig.domains.links}
    />
  ) : null;

const Mirrors: FC = () => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(changeISODisplay(true));
  }
  return (
    <IconSide
      title="获取镜像"
      icon={faCompactDisc}
      bg="blue"
      des="这里为您提供各大主流 Linux 发行版的安装镜像 / ISO 文件，请根据您的发行版及其详细版本进行选择"
      onClick={handleClick}
    />
  );
};
const Helps: FC = () =>
  sideConfig.helps.enable ? (
    <IconSide
      title="镜像帮助"
      icon={faTools}
      link={sideConfig.helps.helpLink}
      bg="green"
      des="查看镜像使用说明"
    />
  ) : null;

const Proxies: FC = () => {
  return <>proxies</>;
};

const Links: FC = () =>
  sideConfig.links.enable ? (
    <ListSide
      initClose={sideConfig.links.initClose}
      title="常用链接"
      icon={faLink}
      items={sideConfig.links.links}
    />
  ) : null;

const Side: FC = () => {
  const [mobileExpand, setMobileExpand] = useState<boolean>(false);

  return (
    <div className={s.side}>
      <div className={s.flexAbout}>
        <About mobileExpand={mobileExpand} setMobileExpand={setMobileExpand} />
      </div>
      <div className={s.flexMirrors}>
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
      <div className={`${s.flexLinks} ${mobileExpand ? s.expand : ``}`}>
        <Links />
      </div>
      <div>
        <Proxies />
      </div>
    </div>
  );
};

export default Side;
