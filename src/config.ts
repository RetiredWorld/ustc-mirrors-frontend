// request api
export const MIRROR_API_URL = `https://mirrors.ustc.edu.cn/static/json/mirrorz.json`;
export const FOLDER_API_URL = `https://mirrors.ustc.edu.cn/api/files/`;

// config metadata
export const metaConfig: IMetaConfig = {
  siteName: `科大镜像`,
  domain: `mirrors.ustc.edu.cn`,
  domainLink: `https://mirrors.ustc.edu.cn`,
  homepage: `https://lug.ustc.edu.cn`,
  logo: {
    large: `LUG`,
    small: `USTC`,
    special: `life love linux`,
  },
  meta: {
    defaultTitle: `USTC Open Source Software Mirror | 中国科学技术大学开源软件镜像站`,
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

// config footer
export const footerConfig: IFooterConfig = {
  text: `
        <p>
          中国科学技术大学开源软件镜像由
          <a href="http://ustcnet.ustc.edu.cn/">中国科学技术大学网络信息中心</a> 提供支持。
        </p>
        <p>
          mirrors.ustc.edu.cn 是 Debian, Ubuntu, Fedora, Archlinux, CentOS
          等多个发行版的官方源。目前是中国大陆高校访问量最大，收录最全的开源软件镜像。
        </p>
        <p>
          <a href="https://lug.ustc.edu.cn/">中国科学技术大学 Linux 用户协会</a>
          是由中国科学技术大学在校的 GNU/Linux
          爱好者发起并组成的一个全校性群众团体。成立协会的目的在于联合科大的
          GNU/Linux
          使用者，搭建信息交流共享的平台，宣传自由软件的价值，提高自由软件社区文化氛围，推广自由软件在科大校园乃至合肥地区的应用。
        </p>
  `,
};

export interface ILink {
  name: string;
  link: string;
}

interface IMetaConfig {
  siteName: string;
  domain: string;
  domainLink: string;
  homepage: string;
  meta: {
    defaultTitle: string;
  };
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

interface IFooterConfig {
  text: string;
}
