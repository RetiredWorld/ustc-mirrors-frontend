import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { formatDate, ISingleMirror, parseTimeAndStatus } from '@/types/mirror';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
  faCheckCircle,
  faCircleNotch,
  faSync,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { IFolderItem } from '@/types/folder';
import s from './ItemList.module.scss';

const LoadingLayer: FC = () => (
  <tbody>
    <tr>
      <td>
        <div className={s.loading}>loading</div>
      </td>
    </tr>
  </tbody>
);

const FolderHeader: FC = () => (
  <thead className={s.header}>
    <tr>
      <th>文件夹名称</th>
      <th>最近更新日期</th>
      <th>文件大小</th>
    </tr>
  </thead>
);

const MirrorHeader: FC = () => (
  <thead className={s.header}>
    <tr>
      <th>镜像名称</th>
      <th>最近更新日期</th>
      <th className={s.status}>状态</th>
      <th className={s.detail}>
        <span className={s.title}>详情</span>
      </th>
      <th className={s.help}>帮助</th>
    </tr>
  </thead>
);

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
    const timeAndStatus = parseTimeAndStatus(item);
    ele = (
      <tr className={s.drop} ref={dropEleRef}>
        <td className={s.dropEle}>
          <p>最后更新: {timeAndStatus.startTime}</p>
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

const MirrorItem: FC<{ item: ISingleMirror; letter?: string }> = ({
  item,
  letter,
}) => {
  const [down, setDown] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setDown((prevState) => !prevState);
  }, []);
  const timeAndStatus = parseTimeAndStatus(item);
  let statusEle: JSX.Element;
  let detailEle: JSX.Element;
  switch (timeAndStatus.status) {
    case `Y`: {
      statusEle = (
        <td className={`${s.syncing} ${s.status}`}>
          <FontAwesomeIcon icon={faSync} />
        </td>
      );
      detailEle = (
        <span>
          <FontAwesomeIcon icon={faSync} />
          同步中
        </span>
      );
      break;
    }
    case `S`: {
      statusEle = (
        <td className={`${s.success} ${s.status}`}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </td>
      );
      detailEle = (
        <span>
          <FontAwesomeIcon icon={faCheckCircle} />
          成功
        </span>
      );
      break;
    }
    case `F`: {
      statusEle = (
        <td className={`${s.fail} ${s.status}`}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </td>
      );
      detailEle = (
        <span>
          <FontAwesomeIcon icon={faTimesCircle} />
          失败
        </span>
      );
      break;
    }
    default: {
      statusEle = (
        <td className={`${s.fail} ${s.status}`}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </td>
      );
      detailEle = <span>未知</span>;
    }
  }
  const ele = (
    <tr onClick={handleClick}>
      <td className={s.name}>
        <Link href={`/files${item.url}`}>{item.cname}</Link>
      </td>
      <td>{timeAndStatus.startTime}</td>
      {statusEle}
      <td
        className={`${s.detail} ${s.icon} ${
          timeAndStatus.status === `F` ? s.fail : ``
        }
        ${timeAndStatus.status === `Y` ? s.syncing : ``}
        ${timeAndStatus.status === `S` ? s.success : ``}
        `}
      >
        {down ? detailEle : <FontAwesomeIcon icon={faCircleNotch} />}
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
      {letter ? <tr className={s.letter}>{letter}</tr> : null}
      {ele}
      <MirrorItemDrop item={item} down={down} />
    </>
  );
};

const FolderItem: FC<{ item: IFolderItem }> = ({ item }) => {
  const isDirectory = item.type === `directory`;
  return (
    <tr>
      <td>{isDirectory ? `${item.name}/` : item.name}</td>
      <td>{formatDate(item.mtime, false)}</td>
      <td>{isDirectory ? `-` : item.size}</td>
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
  <table className={s.table}>
    <MirrorHeader />
    {isLoading ? <LoadingLayer /> : <MirrorItemList items={items} />}
  </table>
);

export const FolderItemTable: FC<{ items: IFolderItem[]; isLoading: boolean }> =
  ({ items, isLoading }) => (
    <table className={s.table}>
      <FolderHeader />
      {isLoading ? <LoadingLayer /> : <FolderItemList items={items} />}
    </table>
  );
