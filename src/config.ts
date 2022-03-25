// request api
export const MIRROR_API_URL = `https://mirrors.ustc.edu.cn/static/json/mirrorz.json`;
export const FOLDER_API_URL = `https://mirrors.ustc.edu.cn/api/files/`;

// config metadata
export const metaConfig: IMetaConfig = {
  siteName: `科大镜像`,
  domain: `mirrors.ustc.edu.cn`,
  homepage: `https://lug.ustc.edu.cn`,
  logo: {
    large: `LUG`,
    small: `USTC`,
    special: `life love linux`,
  },
};

// config sidebar
export const sideConfig: ISideConfig = {
  mirrors: {
    enable: true, // enable mirror download page
  },
  news: {
    enable: true, // enable news, by default display 3 news, with a more 'button' leading to `newsLink`
    newsLink: ``,
  },
  domains: {
    enable: true,
    initClose: true,
    links: [
      {
        name: `自动解析(mirrors.ustc.edu.cn)`,
        link: `//mirrors.ustc.edu.cn`,
      },
      {
        name: `IPv4 线路(ipv4.mirrors)`,
        link: `//ipv4.mirrors.ustc.edu.cn`,
      },
      {
        name: `IPv6 线路(ipv6.mirrors)`,
        link: `//ipv6.mirrors.ustc.edu.cn`,
      },
      {
        name: `教育网线路(cernet.mirrors)`,
        link: `//cernet.mirrors.ustc.edu.cn`,
      },
      {
        name: `电信线路(chinanet.mirrors)`,
        link: `//chinanet.mirros.ustc.edu.cn`,
      },
      {
        name: `联通线路(unicom.mirrors)`,
        link: `//unicom.mirrors.ustc.edu.cn`,
      },
      {
        name: `移动线路(cmcc.mirrors)`,
        link: `//cmcc.mirrors.ustc.edu.cn`,
      },
      {
        name: `Rsync 线路(rsync.mirrors)`,
        link: `/help/rsync-guide.html`,
      },
    ],
  },
  links: {
    enable: true,
    initClose: true,
    links: [
      {
        name: `系统状态`,
        link: `/status`,
      },
      {
        name: `LUG 服务器新闻`,
        link: `https://servers.ustclug.org/`,
      },
      {
        name: `LUG@USTC`,
        link: `http://lug.ustc.edu.cn`,
      },
      {
        name: `新增镜像`,
        link: `https://github.com/ustclug/mirrorrequest/`,
      },
      {
        name: `问题追踪`,
        link: `https://github.com/ustclug/discussions/`,
      },
      {
        name: `联系我们`,
        link: `mailto:lug@ustc.edu.cn`,
      },
    ],
  },
  helps: {
    enable: true,
    initClose: true,
    helpLink: `https://mirrors.ustc.edu.cn/help`,
  },
};

export interface ILink {
  name: string;
  link: string;
}

interface IMetaConfig {
  siteName: string;
  domain: string;
  homepage: string;
  logo: {
    large: string;
    small: string;
    special?: string;
  };
}

interface ISideConfig {
  mirrors: {
    enable: boolean;
    initClose?: boolean;
  };
  news: {
    enable: boolean;
    initClose?: boolean;
    newsLink: string;
  };
  links: {
    enable: boolean;
    initClose?: boolean;
    links: ILink[];
  };
  domains: {
    enable: boolean;
    initClose?: boolean;
    links: ILink[];
  };
  helps: {
    enable: boolean;
    initClose?: boolean;
    helpLink: string;
  };
}
