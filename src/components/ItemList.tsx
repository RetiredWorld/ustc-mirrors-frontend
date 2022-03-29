import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ISingleMirror } from '@/types/mirror';
import { folderURLRewrite, formatDate, formatSize } from '@/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
  faCheckCircle,
  faCircleNotch,
  faCircleQuestion,
  faFolderOpen,
  faSort,
  faSortDown,
  faSortUp,
  faSync,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { IFolderItem } from '@/types/folder';
import { useRouter } from 'next/router';
import path from 'path';
import { useAppDispatch, useAppSelector, useRouterPath } from '@/utils/hooks';
import s from './ItemList.module.scss';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Order, setOrder } from '@/context/search';
import { metaConfig } from '@/config';

const LoadingLayer: FC = () => (
  <div className={s.loading}>
    <div className={s.loadingIcon} />
    <div className={s.loadingTxt}>
      <p className={s.loadingText}>加载中···</p>
      <p className={s.loadingLogo}>
        {metaConfig.logo.small} {metaConfig.logo.large}
      </p>
    </div>
  </div>
);

const EmptyLayer: FC = () => (
  <div className={s.empty}>
    <div className={s.emptyIcon}>
      <FontAwesomeIcon icon={faFolderOpen} size={`2x`} />
    </div>
    <div className={s.emptyTxt}>
      <p className={s.emptyText}>没有内容</p>
      <p className={s.emptyLogo}>
        {metaConfig.logo.small} {metaConfig.logo.large}
      </p>
    </div>
  </div>
);

const SortIcon: FC<{ order: boolean; enable?: boolean }> = ({
  order,
  enable,
}) => {
  return (
    <span className={s.sort}>
      <FontAwesomeIcon className={s.sortHide} icon={faSort} />
      {enable ? (
        <FontAwesomeIcon
          className={s.sortFront}
          icon={order ? faSortUp : faSortDown}
        />
      ) : null}
    </span>
  );
};

const FolderHeader: FC = () => {
  const order = useAppSelector((state) => state.search.order);
  const dispatch = useAppDispatch();
  return (
    <thead className={s.header}>
      <tr>
        <th className={s.name} onClick={() => dispatch(setOrder(Order.name))}>
          文件名称
          <SortIcon
            order={order > 0}
            enable={order === Order.name || order === Order.nameRev}
          />
        </th>
        <th className={s.date} onClick={() => dispatch(setOrder(Order.date))}>
          最近更新日期
          <SortIcon
            order={order > 0}
            enable={order === Order.date || order === Order.dateRev}
          />
        </th>
        <th className={s.size} onClick={() => dispatch(setOrder(Order.size))}>
          大小
          <SortIcon
            order={order > 0}
            enable={order === Order.size || order === Order.sizeRev}
          />
        </th>
      </tr>
    </thead>
  );
};

const MirrorHeader: FC = () => {
  const order = useAppSelector((state) => state.search.order);
  const dispatch = useAppDispatch();
  return (
    <thead className={s.header}>
      <tr>
        <th className={s.name} onClick={() => dispatch(setOrder(Order.name))}>
          镜像名称
          <SortIcon
            order={order > 0}
            enable={order === Order.name || order === Order.nameRev}
          />
        </th>
        <th className={s.date} onClick={() => dispatch(setOrder(Order.date))}>
          最近更新日期
          <SortIcon
            order={order > 0}
            enable={order === Order.date || order === Order.dateRev}
          />
        </th>
        <th
          className={s.status}
          onClick={() => dispatch(setOrder(Order.status))}
        >
          状态
          <SortIcon
            order={order > 0}
            enable={order === Order.status || order === Order.statusRev}
          />
        </th>
        <th>详情</th>
        <th>帮助</th>
      </tr>
    </thead>
  );
};

const MirrorItemDrop: FC<{
  item: ISingleMirror;
  down: boolean;
}> = ({ item, down }) => {
  let ele = null;
  const dropEleRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (dropEleRef.current) {
      dropEleRef.current.classList.toggle(s.trans);
    }
  }, [down]);
  if (down) {
    ele = (
      <tr className={s.drop} ref={dropEleRef}>
        <td className={s.dropEle}>
          <p>最后更新: {item.status.startTime}</p>
          {item.help ? (
            <p>
              <a className={s.help} href={item.help}>
                帮助
              </a>
            </p>
          ) : (
            <p>暂无帮助</p>
          )}
        </td>
        <td />
        <td />
      </tr>
    );
  }
  return ele;
};

interface IStatusMap {
  [key: string]: {
    className: string;
    text: string;
    icon: IconDefinition;
  };
}

const statusMap: IStatusMap = {
  Y: {
    className: s.syncing,
    text: `同步中`,
    icon: faSync,
  },
  S: {
    className: s.success,
    text: `成功`,
    icon: faCheckCircle,
  },
  F: {
    className: s.fail,
    text: `失败`,
    icon: faTimesCircle,
  },
  U: {
    className: s.unknown,
    text: `未知`,
    icon: faCircleQuestion,
  },
};

const MirrorItem: FC<{ item: ISingleMirror; letter?: string }> = ({
  item,
  letter,
}) => {
  const [down, setDown] = useState<boolean>(false);
  const search = useAppSelector((state) => state.search);

  const handleClick = useCallback(() => {
    setDown((prevState) => !prevState);
  }, []);
  let status = statusMap[item.status.status];
  if (status === undefined) {
    status = statusMap.U;
  }
  const ele = (
    <tr>
      <td className={s.name}>
        <Link href={`/files${item.url}/`}>{item.cname}</Link>
      </td>
      <td>{item.status.startTime}</td>
      <td className={`${status.className} ${s.status}`}>
        <a href="/status">
          <FontAwesomeIcon icon={status.icon} />
        </a>
      </td>
      <td className={`${s.detail} ${status.className}`} onClick={handleClick}>
        {down ? (
          <span>
            <FontAwesomeIcon icon={status.icon} />
            {status.text}
          </span>
        ) : (
          <FontAwesomeIcon icon={faCircleNotch} />
        )}
      </td>
      <td className={s.help}>
        <a href={item.help} className={s.help}>
          {item.help ? `帮助` : ``}
        </a>
      </td>
    </tr>
  );

  return (
    <>
      {letter &&
      (search.order === Order.name ||
        search.order === Order.nameRev ||
        search.order === Order.none) ? (
        <tr className={s.letter}>
          <td>{letter}</td>
        </tr>
      ) : null}
      {ele}
      <MirrorItemDrop item={item} down={down} />
    </>
  );
};

const FolderItem: FC<{ item: IFolderItem }> = ({ item }) => {
  const isDirectory = item.type === `directory`;
  const router = useRouter();
  const folderPath = useRouterPath(false);

  const url = folderURLRewrite(item.name, isDirectory, folderPath);

  return (
    <tr>
      <td className={s.name}>
        <a
          onClick={(e) => {
            e.preventDefault();
            router.push(
              isDirectory ? path.join(window.location.pathname, url) : url,
            );
          }}
          href={url}
        >
          {isDirectory ? `${item.name}/` : item.name}
        </a>
      </td>
      <td>{formatDate(item.mtime, false)}</td>
      <td>{formatSize(item.size)}</td>
    </tr>
  );
};

const MirrorItemList: FC<{ items: ISingleMirror[] }> = ({ items }) => {
  let letter = ``;
  let letterCounter = -1;

  const itemEle = items.map((item) => {
    const firstLetter = item.cname[0].toUpperCase();
    if (firstLetter !== letter) {
      letter = firstLetter;
      if (letterCounter === -1 || letterCounter > 4) {
        letterCounter = 0;
        return <MirrorItem key={item.cname} item={item} letter={letter} />;
      }
      letterCounter = 0;
    } else {
      letterCounter += 1;
    }
    return <MirrorItem key={item.cname} item={item} />;
  });

  return <tbody className={s.body}>{itemEle}</tbody>;
};

const FolderItemList: FC<{ items: IFolderItem[] }> = ({ items }) => (
  <tbody className={s.body}>
    <FolderItem
      item={{
        name: `..`,
        type: `directory`,
        mtime: ``,
      }}
    />
    {items.map((item) => (
      <FolderItem key={item.name} item={item} />
    ))}
  </tbody>
);

export const MirrorItemTable: FC<{
  items: ISingleMirror[];
  isLoading: boolean;
}> = ({ items, isLoading }) => (
  <>
    <table className={`${s.table} ${s.mirror}`}>
      <MirrorHeader />
      <MirrorItemList items={items} />
    </table>
    {isLoading ? <LoadingLayer /> : null}
    {!isLoading && items.length === 0 ? <EmptyLayer /> : null}
  </>
);

export const FolderItemTable: FC<{
  items: IFolderItem[];
  isLoading: boolean;
}> = ({ items, isLoading }) => (
  <>
    <table className={`${s.table} ${s.folder}`}>
      <FolderHeader />
      <FolderItemList items={items} />
    </table>
    {isLoading ? <LoadingLayer /> : null}
    {!isLoading && items.length === 0 ? <EmptyLayer /> : null}
  </>
);
